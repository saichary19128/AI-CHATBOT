import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// ✅ createRoot is the new API
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
