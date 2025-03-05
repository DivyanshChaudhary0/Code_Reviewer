import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Project from "../pages/project/Project";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/chat/:projectId" element={<Project/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
