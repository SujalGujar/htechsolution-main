import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
// import DonateForm from "./DonateForm";
import React from "react";
const Layout = () => {
  return (
    <>
      <Header />
      <main className="pt-[80px]">
        <Outlet />
      </main>
      

      <Footer />
    </>
  );
};

export default Layout;
