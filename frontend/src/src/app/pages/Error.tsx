import React from "react";
import { useParams } from "react-router-dom";
import { HttpStatusCode } from "axios";
import { ErrorTemplate } from "@app/components/templates/ErrorTemplate";

interface IParams extends Record<string, string> {
    status: string;
}

export const Error: React.FC = () => {
    const { status } = useParams<IParams>();
    return (
        <ErrorTemplate status={parseInt(status ?? '500') as HttpStatusCode} />
    );
};
