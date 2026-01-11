import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: [],
    trailer: null,
    movieForTrailer: null,
  },
  reducers: {
    addMovieList: (state, action) => {
      state.movieList = [...action.payload];
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addMovieForTrailer: (state, action) => {
      state.movieForTrailer = action.payload;
    },
  },
});

export const { addMovieList, addTrailer, addMovieForTrailer } =
  movieSlice.actions;

export default movieSlice.reducer;
