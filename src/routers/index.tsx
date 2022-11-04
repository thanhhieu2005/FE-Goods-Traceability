import routes from './router';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import React from 'react';

const Routers = () => {
  const currentUserInfo = useSelector((state : any) => state.authen.currentUserInfo);

  return (
    <React.Suspense>
      <Routes>
        {
          routes.publicRoutes.map((route, index) => {
            return (
              route.element && (
                <Route key={index} path={route.path} element={route.element} />
              )
            );
          })}
        {Object.keys(currentUserInfo).length !== 0 &&
          routes.commonRoutes.map((route, index) => {
            return (
              route.element && (
                <Route key={index} path={route.path} element={route.element} />
              )
            );
          })}
      </Routes>
    </React.Suspense>
  );
};

export default Routers;
