import React, { useLayoutEffect } from "react";
import { Cookies } from "react-cookie";
import { Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, Typography } from "@mui/material";
import { get } from "@utils";
import { Layout } from "@layout/Layout";
import { useClient } from "@hooks/useClient";
import { useLoading, useUser } from "@app/hooks";
import { AccountIconMenu } from "@components/organisms/AccountIconMenu";
import { FETCH_USER_INFO, LOGOUT } from "@app/constants/ApiUrls";
import { IUser } from "@app/interfaces/IUser";

export const AppLayoutLoader = async (): Promise<IUser> => {
    const cookies = new Cookies();
    const access = cookies.get('access');
    return (await get<IUser>(FETCH_USER_INFO, {
        headers: {
            Authorization: `JWT ${access}`
        }
    })).data;
}

export const AppLayout: React.FC = () => {
    const data = useLoaderData() as IUser;
    const location = useLocation();
    const navigate = useNavigate();
    const { loading } = useLoading();
    const { user, updateUser } = useUser();

    // 初期表示処理
    useLayoutEffect(() => {
        (async () => {
            updateUser(data);
        })();
    }, [location, data]);

    // ログアウト処理
    const handleLogout = async () => {
        navigate('/login');
    };
    
    return (
        <Layout
            sideBarTree={[
                {
                    text: 'ホーム',
                    path: '/',
                    icon: 'Home',
                },
                {
                    text: '写真一覧',
                    path: '/',
                    icon: 'PhotoLibrary',
                },
                {
                    text: 'スクレイピング',
                    path: '/scraping',
                    icon: 'ImageSearch',
                },
            ]}
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
                                    {user.username}
                                </Typography>
                            ),
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
