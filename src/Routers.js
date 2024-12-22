import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/user" element={<User />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
