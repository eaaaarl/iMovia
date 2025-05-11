import { signUpWithEmail } from "@/libs/firebase";
import { useAppDispatch } from "@/libs/redux/hooks";
import { setUser } from "@/libs/redux/state/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signUpSchema, signUpValues } from "../schema/signUp";
import { FIREBASE_AUTH_ERRORS } from "../utils/firebaseAuthErrors";

export const useSignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });

  const handeSignup = async (payload: signUpValues) => {
    setLoading(true);
    try {
      const userCredential = await signUpWithEmail({
        email: payload.email,
        password: payload.password,
      });

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: payload.name,
      });

      dispatch(
        setUser({
          email: user.email || "",
          displayName: user.displayName || "",
          uid: user.uid,
        })
      );

      /*  toast.success("Registered successfully"); */
      form.reset();

      router.push("/(tabs)");
    } catch (error: any) {
      const errMessage =
        FIREBASE_AUTH_ERRORS[error.code] ||
        "Something went wrong, please try again";
      /*   toast.error(errMessage); */
      setToast(errMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (toast !== "") {
      const timer = setTimeout(() => {
        setToast("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  return {
    handeSignup,
    loading,
    form,
    toast,
    router,
  };
};
