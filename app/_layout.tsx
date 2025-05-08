import "@/global.css";
// eslint-disable-next-line import/no-named-as-default
import store from "@/libs/redux/store";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack screenOptions={{ headerShown: false }} />
      </PersistGate>
    </Provider>
  );
}
