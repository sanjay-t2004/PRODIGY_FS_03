import React from "react";
import { Outlet } from "react-router-dom";

import DashboardHeader from "../layout/DashboardHeader.js";

const Container = () => {
    return (
        <main>
            <DashboardHeader />
                <Outlet />
        </main>
    )
}

export default Container;