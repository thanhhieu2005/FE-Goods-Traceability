import React from 'react'
import Login from '../pages/Login/Login.js'

const publicRoutes = [
    { path: "/", name: "Login", element: <Login/> },
    { path: "/forgot_password", element: <Login/>}
]

const protectedRoutes = []

const commonRoute = []

const managerRoute = []

const farmerRoute = []

const routes = {
    publicRoutes,
    protectedRoutes,
    commonRoute,
    managerRoute,
    farmerRoute,
}

export default routes