import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./Main";

import {store,persistor} from './store';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
