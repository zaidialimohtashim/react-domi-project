import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "./assets/css/demo_1/style.css";
// import "./assets/  /demo_1/_sidebar.scss";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import axios from "axios";

import "primereact/resources/themes/bootstrap4-light-blue/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { Router, useLocation, useRoutes } from "react-router";
import { LoaderComponent } from "./Components/LoaderComponent";
import { viewport } from "@popperjs/core";

//@ts-ignore
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

//@ts-ignore
const auth = JSON.parse(localStorage.getItem('user'));

if (auth !== null) {
  axios.defaults.headers.common['Authorization'] = auth.token
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// const router =Router()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter >
        <App />
      </HashRouter>
      <LoaderComponent></LoaderComponent>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
