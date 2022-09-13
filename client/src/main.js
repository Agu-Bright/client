import React from "react";
import App from "./App";
import Auth from "./auth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Main() {
  const { user } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/getdetails" /> : <Auth />}
          />
          <Route path="/getdetails" element={<App />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default Main;
