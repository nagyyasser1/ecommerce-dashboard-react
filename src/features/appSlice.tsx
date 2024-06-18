import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AuthState {
  isMenuOpend: boolean;
  isAssestsOverLayOpend: boolean;
}

const initialState: AuthState = {
  isMenuOpend: false,
  isAssestsOverLayOpend: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpend = !state.isMenuOpend;
    },
    toggleAssestOverlay: (state) => {
      state.isAssestsOverLayOpend = !state.isAssestsOverLayOpend;
    },
  },
});

// Destructure and export specific actions (optional)
export const { toggleMenu, toggleAssestOverlay } = applicationSlice.actions;

export const selectIsMenuOpend = (state: RootState) => state.app.isMenuOpend;
export const selectIsAssestsOpend = (state: RootState) =>
  state.app.isAssestsOverLayOpend;

export default applicationSlice.reducer;
