import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { wrapper, persistor } from "../store";
import { PersistGate } from "redux-persist/lib/integration/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(App);
