import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthState {
  isMenuOpend: boolean;
}

const initialState: AuthState = {
  isMenuOpend: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpend = !state.isMenuOpend;
    },
  },
});

// Destructure and export specific actions (optional)
export const { toggleMenu } = applicationSlice.actions;

export const selectIsMenuOpend = (state: RootState) => state.app.isMenuOpend;

export default applicationSlice.reducer;
