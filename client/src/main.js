import React from "react";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function Main() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Navigate to="/getdetails" />} />
          <Route path="/getdetails" element={<App />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default Main;
