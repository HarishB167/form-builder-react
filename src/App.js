import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default App;
