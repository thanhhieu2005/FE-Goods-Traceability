import React from 'react';
import Login from '../pages/auth/Login.js';
import { Home } from '../pages/home/Home.js';

const publicRoutes = [
  { path: '/login', name: 'Login', element: <Login /> },
  { path: '/forgot_password', name: 'ForgotPassword', element: <Login /> },
  { path: '/register', name: 'Register', element: <Login /> },
];

const protectedRoutes :any[] = [];

const commonRoutes = [{ path: '/', name: 'Home', element: <Home /> }];

const adminTechRoute :any[] = [];

const farmerRoute : any[] = [];

const routes = {
  publicRoutes,
  protectedRoutes,
  commonRoutes,
  adminTechRoute,
  farmerRoute,
};

export default routes;
