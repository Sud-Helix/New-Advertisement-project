import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./products/products";
import DetailProduct from "./detailproduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./utils/NotFound/NotFound";
import Categories from "./categories/Categories";
import CreateProduct from "./createproducts/CreateProducts";
import GlobalState from "../../GlobalState";

const MainPages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <>
      <Routes>
        <Route path="/" exact element={<Products />} />
        <Route path="/detail/:id" exact element={<DetailProduct />} />

        <Route path="/category" exact element={<Categories />} />
        <Route path="/create_product" exact element={<CreateProduct />} />
        <Route path="/edit_product/:id" exact element={<CreateProduct />} />

        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />

        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </>
  );
};

export default MainPages;
