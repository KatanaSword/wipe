import { InitialState } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    signout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;
