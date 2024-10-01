import { Navigate, RouteObject } from "react-router-dom";
import { Login, LoginLoader } from "@app/pages/Login";
import { SignUp, SignUpLoader } from "@app/pages/SignUp";
import { Error } from "@app/pages/Error";
import { ErrorHandle } from "@app/pages/ErrorHandle";
import { AppLayout, AppLayoutLoader } from "@app/layout/AppLayout";
import { Home, HomeLoader } from "@app/pages/Home";
import { Scraping } from "@app/pages/Scraping";

/**
 * ルート定義
 * @summary ※ elementに設定したコンポーネントでroutesを参照しないでください。理由：逆参照となって、エラーになってしまいます。
 */
export const routes: RouteObject[] = [
    {
        id: 'Login',
        path: '/login',
        element: <Login />,
        meta: {
            text: 'ログイン'
        },
        loader: LoginLoader,
    },
    {
        id: 'SignUp',
        path: '/signup',
        element: <SignUp />,
        meta: {
            text: 'アカウント登録'
        },
        loader: SignUpLoader,
    },
    {
        id: 'Error',
        path: '/error/:status',
        element: <Error />,
    },
    {
        id: 'NotFound',
        path: '*',
        element: <Navigate to='/error/404' />
    },
    {
        id: 'Layout',
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorHandle />,
        loader: AppLayoutLoader,
        children: [
            {
                id: 'Home',
                index: true,
                element: <Home />,
                meta: {
                    text: 'ホーム',
                    icon: 'Home',
                },
                loader: HomeLoader,
            },
            {
                id: 'Scraping',
                path: '/scraping',
                element: <Scraping />,
                meta: {
                    text: 'スクレイピング',
                    icon: 'Home',
                },
            },
        ]
    },
];

