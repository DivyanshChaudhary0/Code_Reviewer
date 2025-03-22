import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Project from "../pages/project/Project";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Protected from "../components/Protected";
import Verification from "../pages/VerifyOTP/Verification";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ForgotPassword/ResetPassword";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected children={<Home/>} />} />
        <Route path="/project/:projectId" element={ <Protected children={<Project/>} /> } />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/verify" element={<Verification/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
