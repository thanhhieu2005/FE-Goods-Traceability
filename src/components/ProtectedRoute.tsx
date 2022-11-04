import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    isAllowed: boolean;
    redirectLink?: string;
  }
  
  export default function ProtectedRoute({
    children,
    isAllowed,
    redirectLink = '/login',
  }: ProtectedRouteProps) {
    if (!isAllowed) return <Navigate to={redirectLink} replace />;
    return <>{children}</>;
  }
