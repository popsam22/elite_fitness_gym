import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import WorkoutsContextProvider from "./context/WorkoutsContext";
import AuthContextProvider from "./context/AuthContext";

const id = document.getElementById("root");
const root = ReactDOM.createRoot(id);
root.render(
  <AuthContextProvider>
    <WorkoutsContextProvider>
      <App />
    </WorkoutsContextProvider>
  </AuthContextProvider>
);
