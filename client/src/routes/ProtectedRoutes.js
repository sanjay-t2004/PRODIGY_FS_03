import React from "react";
import { Navigate, Outlet } from "react-router-dom";


export const ProtectedRoute = () => {
    // check for user logic

    // if !user navigate "/" 

    return (
        <Outlet />
    )
}

export default ProtectedRoute;