import React from "react";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Layout from "../components/app/Layout/Layout";
import { Provider } from "react-redux";
import store from "../redux/store/appStore";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
