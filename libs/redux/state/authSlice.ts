import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
}

const initialState: UserState = {
  displayName: "",
  email: "",
  uid: "",
  photoURL: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string;
        displayName: string;
        email: string;
        photoURL?: string;
      }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
      state.photoURL = action.payload.photoURL;
    },
    clearUser: (state) => {
      state.uid = "";
      state.email = "";
      state.displayName = "";
    },
  },
});

export const { clearUser, setUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
