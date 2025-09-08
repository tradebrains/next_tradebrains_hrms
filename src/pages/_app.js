import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import Layout from "./Layout";
import store from "../redux/store";
import DotLoader from "@/components/DotLoader/DotLoader";
export default function App({ Component, pageProps }) {
  let persistor = persistStore(store);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });
  useEffect(() => {
    if (router?.query?.refer) {
      sessionStorage.setItem("referID", router?.query?.refer);
    }
  }, [router?.query?.refer]);
  const Content = loading ? <DotLoader /> : <Component {...pageProps} />;

  return (
    <Provider store={store}>
      <PersistGate loading={<DotLoader />} persistor={persistor}>
        {() => (
          <>
            <Toaster richColors position="top-center" />

            <Layout>{Content}</Layout>
          </>
        )}
      </PersistGate>
    </Provider>
  );
}
