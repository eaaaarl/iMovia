import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  uid: string;
  displayName: string;
  email: string;
}

const initialState: UserState = {
  displayName: "",
  email: "",
  uid: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ uid: string; displayName: string; email: string }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.displayName = action.payload.displayName;
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
