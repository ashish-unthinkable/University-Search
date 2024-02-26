import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<Profile />} />
          </Route>
          <Route exact path="/search" element={<ProtectedRoute />}>
            <Route exact path="/search" element={<Search />} />
          </Route>

          {/* Wildcard Route Freefall */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
