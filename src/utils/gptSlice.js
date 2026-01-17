import { createSlice } from "@reduxjs/toolkit";

const gptSearch = createSlice({
  name: "gpt",
  initialState: {
    gptButton: true,
  },
  reducers: {
    setGptButtonVisibility: (state, action) => {
      state.gptButton = action.payload;
    },
  },
});

export const { setGptButtonVisibility } = gptSearch.actions;

export default gptSearch.reducer;
