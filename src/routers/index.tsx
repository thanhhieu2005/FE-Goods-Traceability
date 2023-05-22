// import routes from "./router";
// import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/auth/Login";
import { LayoutCustom } from "@/pages/layout/LayoutCustom";
import { AccountManagement } from "@/pages/tech_admin/account_management/AcountManagement";
import { TechAdminFarm } from "@/pages/tech_admin/farm_techadmin/TechAdminFarm";
import { ProjectManagement } from "@/pages/system_admin/project_management/ProjectManagement";
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
import ForgotPassword from "@/pages/auth/ForgotPassword";
import AccountDetail from "@/pages/tech_admin/account_management/AccountDetail";
import TechAdminFarmDetail from "@/pages/tech_admin/farm_techadmin/TechAdminFarmDetail";
import FarmInfo from "@/pages/farm/FarmInfo";
import FarmProjectManagement from "@/pages/farm/farm_project/FarmProjectManagement";
import FarmProjectDetail from "@/pages/farm/farm_project/FarmProjectDetail";
import LandManagement from "@/pages/farm/land/LandManagement";
import SeedManagement from "@/pages/farm/seed/SeedManagement";
import CreateFarmProject from "@/pages/farm/farm_project/CreateFarmProject";
import ProjectLog from "../pages/system_admin/project_detail/project_log/Project_Log";
import CreateNewProject from "@/pages/system_admin/project_management/CreateNewProject";
import StaffManagement from "@/pages/system_admin/staff_management/StaffManagement";
import StaffInfoDetail from "@/pages/system_admin/staff_management/StaffInfoDetail";
import CreateStaffForm from "@/pages/system_admin/staff_management/CreateStaffForm";

const Routers = () => {
  // const currentUserInfo = useSelector((state : any) => state.authen.currentUserInfo);

  // Kiểm tra token còn đăng nhập
  const currentTokenLocal = localStorage.getItem("token");
  const currentToken = useSelector((state: any) => state.authen.token);

  // Kiểm tra role của user để render
  const userName = useSelector((state: any) => state.authen.currentUserInfo);

  // Kiểm tra đăng nhập hay chưa
  const login = useSelector((state: any) => state.authen.isLogin);

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
              {/* Check Role to render Route */}
              {userName.role === 1 ? ( // Technical Admin Router
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/techAd-account-management" />}
                  />
                  <Route
                    path="/techAd-account-management"
                    element={<AccountManagement />}
                  />
                  <Route
                    path="/techAd-account-management/:userId"
                    element={<AccountDetail />}
                  />
                  <Route
                    path="/techAd-farm-management"
                    element={<TechAdminFarm />}
                  />
                  <Route
                    path="/techAd-farm-management/:farmId"
                    element={<TechAdminFarmDetail />}
                  />
                </>
              ) : userName.role === 2 ? ( // System Admin Router
                <>
                  <Route
                    path="/"
                    element={<Navigate to="/project-management" />}
                  />
                  {/* Project Management Router */}
                  <Route
                    path="/project-management"
                    element={<ProjectManagement />}
                  />
                  <Route
                    path="/project-management/:projectId"
                    element={<ProjectDetail />}
                  />

                  <Route path="/project-log" element={<ProjectLog />} />
                  <Route
                    path="/create-new-project"
                    element={<CreateNewProject />}
                  />
                  {/* Staff Management Router */}
                  <Route
                    path="/staff-management"
                    element={<StaffManagement/>}
                  />
                  <Route
                    path="/staff-management/:userId"
                    element={<StaffInfoDetail/>}
                  />
                  <Route
                    path="/create-new-staff"
                    element={<CreateStaffForm/>}
                  />
                </>
              ) : userName.role === 3 ? ( // Farm Router
                <>
                  <Route path="/" element={<Navigate to="/farm-info" />} />
                  <Route path="/farm-info" element={<FarmInfo />} />
                  {userName.isOwner ? (
                    <Route>
                      <Route
                        path="/farm-project-management"
                        element={<FarmProjectManagement />}
                      />
                      <Route
                        path="/farm-project-management/:farmProjectId"
                        element={<FarmProjectDetail />}
                      />
                      <Route
                        path="/land-management"
                        element={<LandManagement />}
                      />
                      <Route
                        path="/seed-management"
                        element={<SeedManagement />}
                      />
                      <Route
                        path="farm-project-management/create-farm-project"
                        element={<CreateFarmProject />}
                      />
                    </Route>
                  ) : (
                    <Route />
                  )}
                </>
              ) : userName.role === 4 && userName.department === 1 ? (
                <></>
              ) : userName.role === 4 && userName.department === 2 ? (
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
              ) : userName.role === 4 && userName.department === 3 ? (
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
              ) : userName.role === 4 && userName.department === 4 ? (
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
              ) : userName.role === 4 && userName.department === 5 ? (
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </>
        )}
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
