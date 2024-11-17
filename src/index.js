import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import App1 from "./AppV1";
import AppMemo from "./App-memo";
import AppUseMemo from "./App-useMemo";
import AppUseCallback from "./App-useCallback";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>
);
