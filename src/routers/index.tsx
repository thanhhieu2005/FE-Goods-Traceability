// import routes from "./router";
// import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/auth/Login";
import { LayoutCustom } from "@/pages/layout/LayoutCustom";
import { AccountManagement } from "@/pages/tech_admin/account_management/AcountManagement";
import { TechAdminFarm } from "@/pages/tech_admin/farm_techadmin/TechAdminFarm";
import { BatchManagement } from "@/pages/system_admin/BatchManagement";
import BatchDetail from "@/pages/system_admin/BatchDetail";
import { useSelector } from "react-redux";

const Routers = () => {
  // const currentUserInfo = useSelector((state : any) => state.authen.currentUserInfo);


  // Kiểm tra token còn đăng nhập
  const currentToken = localStorage.getItem("token");

  // Kiểm tra role của user để render
  const userName = useSelector((state: any) => state.authen.currentUserInfo);

  // Kiểm tra đăng nhập hay chưa
  const login = useSelector((state: any) => state.authen.isLogin);


  console.log("login " + login);

  return (
    <React.Suspense>
      <Routes>
        {login ? (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute isAllowed={!!currentToken}>
                  <LayoutCustom></LayoutCustom>
                </ProtectedRoute>
              }
            >
              {/* Tech Admin Router */}
              {userName.role === 1 ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/techAd-account-management" />}
                  />
                  <Route
                    path="/techAd-account-management"
                    element={<AccountManagement />}
                  />
                  <Route path="/farm-management" element={<TechAdminFarm />} />
                </>
              ) : (
                <>
                   <Route
                    path="/"
                    element={<Navigate to="/batch-management" />}
                  />
                  {/* System Admin Router */}
                  <Route
                    path="/batch-management"
                    element={<BatchManagement />}
                  />
                  <Route path="/batch-management/id" element={<BatchDetail />} />
                  <Route path="/farm-management" element={<TechAdminFarm />} />
                </>
              )}
            </Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
