import "../styles/index.css";
import "../styles/base.css";
import type { AppProps } from "next/app";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "../src/redux/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension";
import Layout from "../src/screens/general/layout/Layout";

const initalState = {};

const middleware = [thunk];
const makeStore = () =>
  createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

const wrapper = createWrapper(makeStore);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
