import { Navigate } from 'react-router-dom';
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Login from "@/pages/auth/Login";

const publicRoutes = [
    { path: "/login", name: "Login", element: <Login/> },
    { path: "/forgot-password", name: "ForgotPassword", element: <ForgotPassword/> },
    { path: "/", name: "PublicRoot", element: <Navigate to='/login'/> }
];

const systemAdminRoutes = [];

const businessAdminRoutes = [];

const farmerRoutes = [];

const routes = {
    publicRoutes,
    systemAdminRoutes,
    businessAdminRoutes,
    farmerRoutes
}

export default routes;