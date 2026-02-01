import { createSlice } from "@reduxjs/toolkit";

const gptSearch = createSlice({
  name: "gpt",
  initialState: {
    gptList: null,
    searchMovieList: [],
  },
  reducers: {
    setSearchTitleList: (state, action) => {
      state.gptList = action.payload;
    },
    setTmdbMovieList: (state, action) => {
      state.searchMovieList = action.payload;
    },
    resetState: (state) => {
      state.gptList = null;
      state.searchMovieList = [];
    }
  },
});

export const { setSearchTitleList, setTmdbMovieList, resetState } = gptSearch.actions;

export default gptSearch.reducer;
