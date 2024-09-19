import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Container = () => {
    return (
        <main>
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Container;