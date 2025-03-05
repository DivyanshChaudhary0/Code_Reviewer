import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Project from "../pages/project/Project";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Protected from "../components/Protected";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Protected children={<Home/>} />} />
        <Route path="/project/:projectId" element={ <Protected children={<Project/>} /> } />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
