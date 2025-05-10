import { movieApi } from "@/features/movie/api/movieApi";
import { tmdbApi } from "@/features/tmdb/api/tmbdbApi";
import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./state/authSlice";

const rootReducer = combineReducers({
  user: authReducer,

  [tmdbApi.reducerPath]: tmdbApi.reducer,
  [movieApi.reducerPath]: movieApi.reducer,
});

export const apis = [tmdbApi, movieApi];
export const apiReducerPaths = apis.map((api) => api.reducerPath);

export default rootReducer;
