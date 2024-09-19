import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { Layout } from "@layout/Layout";
import { useClient } from "@hooks/useClient";
import { useLoading, useMenu, useSystem, useUser } from "@app/admin/hooks";
import { AccountIconMenu } from "@app/admin/components/organisms/AccountIconMenu";
import { FETCH_MENU_ITEMS, FETCH_SYSTEM, FETCH_USER, LOGOUT } from "@app/admin/constants/ApiUrls";

interface AppLayoutProps {
}

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { get, post } = useClient(false);
    const { loading } = useLoading();
    const { user, updateUser } = useUser();
    const { system, updateSystem } = useSystem();
    const { sidebar, updateMenu } = useMenu();

    useLayoutEffect(() => {
        (async () => {
            updateUser((await get(FETCH_USER)).data);
            updateSystem((await get(FETCH_SYSTEM)).data);
            updateMenu((await get(FETCH_MENU_ITEMS)).data);
        })();
    }, [location]);

    // ログアウト処理
    const handleResetPassword = async () => {
        navigate('/reset-password');
    };

    // ログアウト処理
    const handleLogout = async () => {
        await post(LOGOUT);
        navigate('/login');
    };
    
    return (
        <Layout
            sideBarTree={sidebar}
            appBarRightToolbar={
                <AccountIconMenu
                    items={[
                        {
                            children: (
                                <Typography sx={{
                                    width: '150px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textAlign: 'center'
                                }}>
                                    {user.UserName}
                                </Typography>
                            ),
                        },
                        {
                            children: 'パスワード変更',
                            onClick: handleResetPassword,
                        },
                        {
                            children: 'ログアウト',
                            onClick: handleLogout,
                        }
                    ]}
                />
            }
        >
            <Outlet />
            <Backdrop
                sx={((theme) => ({
                    color: '#fff',
                    zIndex: theme.zIndex.modal + 1,
                }))}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Layout>
    );
}
