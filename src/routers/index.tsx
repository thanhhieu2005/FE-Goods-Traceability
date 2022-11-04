import routes from "./router";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/auth/Login";
import { Home } from "@/pages/home/Home";

const Routers = () => {
  // const currentUserInfo = useSelector((state : any) => state.authen.currentUserInfo);

  const currentToken = localStorage.getItem("token");

  return (
    <React.Suspense>
      <Routes>
        {/* {
          routes.publicRoutes.map((route, index) => {
            return (
              route.element && (
                <Route key={index} path={route.path} element={route.element} />
              )
            );
          })} */}
        {/* {Object.keys(currentUserInfo).length !== 0 &&
          routes.commonRoutes.map((route, index) => {
            return (
              route.element && (
                <Route key={index} path={route.path} element={route.element} />
              )
            );
          })} */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={!!currentToken}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
