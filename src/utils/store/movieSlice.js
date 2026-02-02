import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movieList: [],
    upcomingMovieList: [],
    topRatedMovieList: [],
    popularMovieList: [],
    trailer: null,
    movieForTrailer: null,
  },
  reducers: {
    addMovieList: (state, action) => {
      state.movieList = [...action.payload];
    },
    addUpcomingMovieList: (state, action) => {
      state.upcomingMovieList = [...action.payload];
    },
    addTopRatedMovieList: (state, action) => {
      state.topRatedMovieList = [...action.payload];
    },
    addPopularMovieList: (state, action) => {
      state.popularMovieList = [...action.payload];
    },
    addTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    addMovieForTrailer: (state, action) => {
      state.movieForTrailer = action.payload;
    },
    resetMovieSate: (state) => {
      state.movieList = [];
      state.upcomingMovieList = [];
      state.topRatedMovieList = [];
      state.popularMovieList = [];
      state.trailer = null;
      state.movieForTrailer = null;
    }
  },
});

export const {
  addMovieList,
  addUpcomingMovieList,
  addTopRatedMovieList,
  addPopularMovieList,
  addTrailer,
  addMovieForTrailer,
  resetMovieSate
} = movieSlice.actions;

export default movieSlice.reducer;
