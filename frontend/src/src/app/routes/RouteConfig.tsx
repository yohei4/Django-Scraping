import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { Login, LoginLoader } from "@app/admin/pages/Login";
import { Home, HomeLoader } from "@app/admin/pages/Home";
import { PendingLoadingStatus, PendingLoadingStatusLoader } from "@app/admin/pages/pendingLoadingStatus/PendingLoadingStatus";
import { LoadingStatus } from "@app/admin/pages/LoadingStatus";
import { Notice, NoticeLoader } from "@app/admin/pages/notice/Notice";
import { Master, MasterLoader } from "@app/admin/pages/master/Master";
import { AppLayout } from "@app/admin/layout/AppLayout";
import { WarehouseStatus, WarehouseStatusList, WarehouseStatusDetail, WarehouseStatusDetailLoader } from "@app/admin/pages/pendingLoadingStatus/warehouseStatus";
import { VehicleStatus, VehicleStatusList, VehicleStatusDetail, VehicleStatusDetailLoader } from "@app/admin/pages/pendingLoadingStatus/vehicleStatus";
import { ContactPerson, ContactPersonAdd, ContactPersonDetail, ContactPersonDetailLoader, ContactPersonList } from "@app/admin/pages/master/contactPerson";
import { NoticeIndividual, NoticeIndividualDetail, NoticeIndividualDetailLoader, NoticeIndividualList } from "@app/admin/pages/notice/individual";
import { NoticeGeneral, NoticeGeneralLoader } from "@app/admin/pages/notice/general";
import { TransportVehicle, TransportVehicleAdd, TransportVehicleDetail, TransportVehicleDetailLoader, TransportVehicleList } from "@app/admin/pages/master/transportVehicle";
import { ReportVehicle, ReportVehicleList, ReportVehicleDetail } from "@app/admin/pages/report/vehicle";
import { Report } from "@app/admin/pages/report/Report";
import { Warehouse, WarehouseAdd, WarehouseAddLoader, WarehouseDetail, WarehouseDetailLoader, WarehouseList } from "@app/admin/pages/master/warehouse";
import { ReportWarehouse, ReportWarehouseList } from "@app/admin/pages/report/warehouse";
import { SystemSettings, SystemSettingsLoader } from "@app/admin/pages/master/systemSettings";
import { Error } from "@app/admin/pages/Error";
import { ErrorHandle } from "@app/admin/pages/ErrorHandle";
import { ResetPassword } from "@app/admin/pages/ResetPassword";

/**
 * ルート定義
 * @summary ※ elementに設定したコンポーネントでroutesを参照しないでください。理由：逆参照となって、エラーになってしまいます。
 */
export const routes: RouteObject[] = [
    {
        id: 'Layout',
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorHandle />,
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
                id: 'LoadingTableDeliveryStatus',
                path: 'loading-status',
                element: <LoadingStatus />,
            },
            {
                id: 'PendingLoadingStatus',
                path: 'pending-loading-status',
                element: <Outlet />,
                children: [
                    {
                        id: 'PendingLoadingStatusMenu',
                        index: true,
                        element: <PendingLoadingStatus />,
                        meta: {
                            text: '待機積込状況',
                            icon: 'LocalShipping'
                        },
                        loader: PendingLoadingStatusLoader,
                    },
                    {
                        id: 'WarehouseStatus',
                        path: 'warehouse-status',
                        element: <WarehouseStatus />,
                        children: [
                            {
                                id: 'WarehouseStatusList',
                                index: true,
                                element: <WarehouseStatusList />,
                                meta: {
                                    text: '倉庫待機状況一覧',
                                },
                            },
                            {
                                id: 'WarehouseStatusDetail',
                                path: ':WarehouseCd',
                                element: <WarehouseStatusDetail />,
                                meta: {
                                    text: '倉庫待機状況詳細',
                                },
                                loader: WarehouseStatusDetailLoader
                            },
                        ]
                    },
                    {
                        id: 'VehicleStatus',
                        path: 'vehicles-status',
                        element: <VehicleStatus />,
                        children: [
                            {
                                id: 'VehicleStatusList',
                                index: true,
                                element: <VehicleStatusList />,
                                meta: {
                                    text: '車両待機状況一覧',
                                },
                            },
                            {
                                id: 'VehicleStatusDetail',
                                path: ':code',
                                element: <VehicleStatusDetail />,
                                meta: {
                                    text: '車両待機状況詳細',
                                },
                                loader: VehicleStatusDetailLoader
                            },
                        ]
                    },
                ]
            },
            {
                id: 'Notice',
                path: 'notice',
                element: <Outlet />,
                children: [
                    {
                        id: 'NoticeMenu',
                        index: true,
                        element: <Notice />,
                        meta: {
                            text: 'お知らせ管理',
                            icon: 'MessageOutlined'
                        },
                        loader: NoticeLoader,
                    },
                    {
                        id: 'NoticeGeneral',
                        path: 'general',
                        element: <NoticeGeneral />,
                        meta: {
                            text: '共通お知らせ',
                        },
                        loader: NoticeGeneralLoader
                    },
                    {
                        id: 'NoticeIndividual',
                        path: 'individual',
                        element: <NoticeIndividual />,
                        children: [
                            {
                                id: 'NoticeIndividualList',
                                index: true,
                                element: <NoticeIndividualList />,
                                meta: {
                                    text: '個別お知らせ一覧',
                                },
                            },
                            {
                                id: 'NoticeIndividualDetail',
                                path: ':DriverId',
                                element: <NoticeIndividualDetail />,
                                meta: {
                                    text: '個別お知らせ登録',
                                },
                                loader: NoticeIndividualDetailLoader
                            },
                        ]
                    },
                ]
            },
            {
                id: 'ReportGeneration',
                path: 'report',
                element: <Outlet />,
                children: [
                    {
                        id: 'ReportMenu',
                        index: true,
                        element: <Report />,
                        meta: {
                            text: '帳票出力',
                            icon: 'FileDownloadOutlined'
                        },
                    },
                    {
                        id: 'ReportWarehouse',
                        path: 'warehouse',
                        element: <ReportWarehouse />,
                        children: [
                            {
                                id: 'ReportWarehouseList',
                                index: true,
                                element: <ReportWarehouseList />,
                                meta: {
                                    text: '倉庫別荷役時間',
                                },
                            },
                        ]
                    },
                    {
                        id: 'vehicle',
                        path: 'vehicle',
                        element: <ReportVehicle />,
                        children: [
                            {
                                id: 'VehicleList',
                                index: true,
                                element: <ReportVehicleList />,
                                meta: {
                                    text: '車両別荷役時間',
                                },
                            },
                            {
                                id: 'VehicleDetail',
                                path: ':code',
                                element: <ReportVehicleDetail />,
                                meta: {
                                    text: '車両別荷役時間詳細',
                                },
                            },
                        ]
                    },
                ]
            },
            {
                id: 'Master',
                path: 'master',
                element: <Outlet />,
                children: [
                    {
                        id: 'MasterMenu',
                        index: true,
                        element: <Master />,
                        meta: {
                            text: 'マスタ',
                            icon: 'StorageRounded'
                        },
                        loader: MasterLoader,
                    },
                    {
                        id: 'ContactPerson',
                        path: 'contact-person',
                        element: <ContactPerson />,
                        children: [
                            {
                                id: 'ContactPersonList',
                                index: true,
                                element: <ContactPersonList />,
                                meta: {
                                    text: '担当者一覧',
                                },
                            },
                            {
                                id: 'ContactPersonAdd',
                                path: 'add',
                                element: <ContactPersonAdd />,
                                meta: {
                                    text: '担当者登録',
                                },
                            },
                            {
                                id: 'ContactPersonDetail',
                                path: 'detail/:UserCd',
                                element: <ContactPersonDetail />,
                                meta: {
                                    text: '担当者詳細',
                                },
                                loader: ContactPersonDetailLoader
                            },
                        ]
                    },
                    {
                        id: 'TransportVehicle',
                        path: 'transport-vehicle',
                        element: <TransportVehicle />,
                        children: [
                            {
                                id: 'TransportVehicleList',
                                index: true,
                                element: <TransportVehicleList />,
                                meta: {
                                    text: '車両一覧',
                                },
                            },
                            {
                                id: 'TransportVehicleAdd',
                                path: 'add',
                                element: <TransportVehicleAdd />,
                                meta: {
                                    text: '車両登録',
                                },
                            },
                            {
                                id: 'TransportVehicleDetail',
                                path: 'detail/:CarrierCd',
                                element: <TransportVehicleDetail />,
                                meta: {
                                    text: '車両詳細',
                                },
                                loader: TransportVehicleDetailLoader
                            },
                        ]
                    },
                    {
                        id: 'Warehouse',
                        path: 'warehouse',
                        element: <Warehouse />,
                        meta: {
                            text: '倉庫',
                        },
                        children: [
                            {
                                id: 'WarehouseList',
                                index: true,
                                element: <WarehouseList />,
                                meta: {
                                    text: '倉庫一覧',
                                },
                            },
                            {
                                id: 'WarehouseAdd',
                                path: 'add',
                                element: <WarehouseAdd />,
                                meta: {
                                    text: '倉庫登録',
                                },
                                loader: WarehouseAddLoader
                            },
                            {
                                id: 'WarehouseDetail',
                                path: 'detail/:WarehouseCd',
                                element: <WarehouseDetail />,
                                meta: {
                                    text: '倉庫詳細',
                                },
                                loader: WarehouseDetailLoader
                            },
                        ]
                    },
                    {
                        id: 'SystemSettings',
                        path: 'system-settings',
                        element: <SystemSettings />,
                        meta: {
                            text: 'システム管理',
                        },
                        loader: SystemSettingsLoader
                    },
                ]
            },
            {
                id: 'ResetPassword',
                path: 'reset-password',
                element: <ResetPassword />,
            },
        ],
    },
    {
        id: 'Error',
        path: '/error/:status',
        element: <Error />,
    },
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
        id: 'NotFound',
        path: '*',
        element: <Navigate to='/error/404' />
    }
];

