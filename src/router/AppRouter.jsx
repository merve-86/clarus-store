import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Products from "../pages/Products";
import About from "../pages/About";
import Home from "../pages/Home";
// import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";
import ProductDetail from "../pages/ProductDetail"

const AppRouter = () => {
  return (
    // <BrowserRouter>
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<PrivateRouter />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/products/:id" element={<ProductDetail />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
    // </BrowserRouter>
  );
};

export default AppRouter;
