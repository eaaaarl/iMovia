import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import rootReducer, { apiReducerPaths, apis } from "./reducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [...apiReducerPaths],
};
AsyncStorage.getAllKeys().then(console.log).catch(console.error);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: apiReducerPaths,
      },
    }).concat(apis.map((api) => api.middleware)),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
