import React, { useEffect } from "react";
import { isAxiosError } from "axios";
import { useNavigate, useRouteError } from "react-router-dom";

export const ErrorHandle: React.FC = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAxiosError(error)) {
            navigate(`/error/${error.response?.status}`);
        } else {
            navigate('/error/500');
        }
      }, [navigate]);

    return null;
};