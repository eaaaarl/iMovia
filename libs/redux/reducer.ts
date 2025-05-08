import { tmdbApi } from "@/features/tmdb/api/tmbdbApi";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  [tmdbApi.reducerPath]: tmdbApi.reducer,
});

export const apis = [tmdbApi];
export const apiReducerPaths = apis.map((api) => api.reducerPath);

export default rootReducer;
