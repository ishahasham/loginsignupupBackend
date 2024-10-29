import React from "react";
import { Route, Routes } from "react-router-dom";

import Signup from "./Screens/Signup";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";


function App() {
  return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>

  );
}

export default App;
