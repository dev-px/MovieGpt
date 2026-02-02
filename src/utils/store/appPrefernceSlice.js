import { createSlice } from "@reduxjs/toolkit";

const appPrefernceSlice = createSlice({
  name: "appPrefernce",
  initialState: {
    language: "en",
  },
  reducers: {
    setUserPreferredLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setUserPreferredLanguage } = appPrefernceSlice.actions;

export default appPrefernceSlice.reducer;