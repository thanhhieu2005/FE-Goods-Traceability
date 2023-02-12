// import routes from "./router";
// import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/auth/Login";
import { LayoutCustom } from "@/pages/layout/LayoutCustom";
import { AccountManagement } from "@/pages/tech_admin/account_management/AcountManagement";
import { TechAdminFarm } from "@/pages/tech_admin/farm_techadmin/TechAdminFarm";
import { ProjectManagement } from "@/pages/system_admin/ProjectManagement";
import { useSelector } from "react-redux";
import HarvestManagement from "@/pages/harvester/HarvestManagement";
import HarvestDetail from "@/pages/harvester/HarvestDetail";
import TransportManagement from "@/pages/transport/TransportManagement";
import TransportDetail from "@/pages/transport/TransportDetail";
import WarehouseManagement from "@/pages/warehouse/WarehouseManagement";
import WarehouseDetail from "@/pages/warehouse/WarehouseDetail";
import ProduceManagement from "@/pages/produce/ProduceManagement";
import ProjectDetail from "@/pages/system_admin/project_detail/ProjectDetail";
import ProduceDetail from "@/pages/produce/ProduceDetail";

const Routers = () => {
  // const currentUserInfo = useSelector((state : any) => state.authen.currentUserInfo);

  // Kiểm tra token còn đăng nhập
  const currentTokenLocal = localStorage.getItem("token");
  const currentToken = useSelector((state: any) => state.authen.token);

  // Kiểm tra role của user để render
  const userName = useSelector((state: any) => state.authen.currentUserInfo);

  // Kiểm tra đăng nhập hay chưa
  const login = useSelector((state: any) => state.authen.isLogin);

  console.log("login " + login);

  return (
    <React.Suspense>
      <Routes>
        {(login && currentToken != null) || currentTokenLocal ? (
          <>
            <Route
              path="/"
              element={
                <ProtectedRoute isAllowed={!!currentToken || !!currentToken}>
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
              ) : userName.role === 2 ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/project-management" />}
                  />
                  {/* System Admin Router */}
                  <Route
                    path="/project-management"
                    element={<ProjectManagement />}
                  />
                  <Route
                    path="/project-management/:projectId"
                    element={<ProjectDetail />}
                  />
                  <Route path="/farm-management" element={<TechAdminFarm />} />
                </>
              ) : userName.role === 3 ? (
                <></>
              ) : userName.department === 1 ? (
                <></>
              ) : userName.department === 2 ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/harvest-management" />}
                  />
                  <Route
                    path="/harvest-management"
                    element={<HarvestManagement />}
                  />
                  <Route
                    path="/harvest-management/:harvestId"
                    element={<HarvestDetail />}
                  />
                </>
              ) : userName.department === 3 ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/transport-management" />}
                  />
                  <Route
                    path="/transport-management"
                    element={<TransportManagement />}
                  />
                  <Route
                    path="/transport-management/:transportId"
                    element={<TransportDetail />}
                  />
                </>
              ) : userName.department === 4 ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/warehouse-management" />}
                  />
                  <Route
                    path="/warehouse-management"
                    element={<WarehouseManagement />}
                  />
                  <Route
                    path="/warehouse-management/:warehouseStorageId"
                    element={<WarehouseDetail />}
                  />
                </>
              ) : userName.department === 5 ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/produce-management" />}
                  />
                  <Route
                    path="/produce-management"
                    element={<ProduceManagement />}
                  />
                  <Route
                    path="/produce-management/:productionId"
                    element={<ProduceDetail />}
                  />
                </>
              ) : (
                <></>
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
