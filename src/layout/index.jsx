import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [toggleSideBar, setToggleSideBar] = useState(true);

  return (
    <div className="wrapper">
      <Sidebar toggle={toggleSideBar} />
      <div className="main">
        <Navbar onToggle={setToggleSideBar} toggle={toggleSideBar} />
        <main className="content">
          <div className="container-fluid p-0">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
