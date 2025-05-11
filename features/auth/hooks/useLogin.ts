import { loginWithEmail } from "@/libs/firebase";
import { useAppDispatch } from "@/libs/redux/hooks";
import { setUser } from "@/libs/redux/state/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signInSchema, signInValues } from "../schema/login";

export const useLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();

  const handleSubmit = async (payload: signInValues) => {
    setIsLoading(true);
    try {
      const authUser = await loginWithEmail({
        email: payload.email,
        password: payload.password,
      });

      dispatch(
        setUser({
          displayName: authUser.user.displayName || "",
          email: authUser.user.email || "",
          uid: authUser.user.uid,
        })
      );

      router.replace("/(tabs)");
      form.reset();
    } catch (error: any) {
      if (error.code === "auth/invalid-credential") {
        setToast("Invalid email and password");
      } else {
        console.log("Authentication error:", error.message);
      }
    } finally {
      setIsLoading(false);
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
    router,
    isLoading,
    handleSubmit,
    toast,
    form,
    setToast,
  };
};
