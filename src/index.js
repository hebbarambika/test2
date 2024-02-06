// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AdminProvider } from "./context/AdminContext";
import { ClubProvider } from "./context/ClubContext";
import { UserProvider } from "./context/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AdminProvider>
      <UserProvider>
        <ClubProvider>
          <App />
        </ClubProvider>
      </UserProvider>
    </AdminProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
