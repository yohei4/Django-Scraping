import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "@/components/Pages";
import { Account } from './';

export const Router: React.VFC = React.memo(() => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Account />
        </Routes>
    );
});