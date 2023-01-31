// import routes from "./router";
// import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/auth/Login";
import { LayoutCustom } from "@/pages/layout/LayoutCustom";
import { AccountManagement } from "@/pages/tech_admin/account_management/AcountManagement";
import { TechAdminFarm } from "@/pages/tech_admin/farm_techadmin/TechAdminFarm";

const Routers = () => {
  // const currentUserInfo = useSelector((state : any) => state.authen.currentUserInfo);

  const currentToken = localStorage.getItem("token");

  return (
    <React.Suspense>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAllowed={!!currentToken}>
              <LayoutCustom></LayoutCustom>
            </ProtectedRoute>
          }
        >
          <Route
            path="/techAd-account-management"
            element={<AccountManagement />}
          />
          <Route path="/farm-management" element={<TechAdminFarm />} />
          <Route path="/home" element={<LayoutCustom />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
