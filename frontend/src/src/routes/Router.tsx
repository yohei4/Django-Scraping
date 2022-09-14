import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "@/components/Pages";

export const Router: React.VFC = React.memo(() => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/" element={<Login />} />
            <Route path="register/" element={<Register />} />
        </Routes>
    );
});