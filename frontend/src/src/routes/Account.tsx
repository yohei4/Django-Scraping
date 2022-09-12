import React from "react";
import { Route } from "react-router-dom";
import { Login, Register } from "@/components/Pages";

export const Account: React.FC = () => {
    return (
        <React.Fragment>
            <Route path="login/" element={<Login />} />
            <Route path="register/" element={<Register />} />
        </React.Fragment>
    );
};