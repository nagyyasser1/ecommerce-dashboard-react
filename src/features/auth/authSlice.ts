import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type User = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  gender: number;
  profilePic: string;
};

interface AuthState {
  token: string;
  user: User;
}

const initialState: AuthState = {
  token: "",
  user: {
    id: "",
    fullName: "",
    username: "",
    email: "",
    gender: 0,
    profilePic: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ accessToken: string; user: User }>
    ) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      (state.user = {
        id: "",
        fullName: "",
        username: "",
        email: "",
        gender: 0,
        profilePic: "",
      }),
        (state.token = "");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
