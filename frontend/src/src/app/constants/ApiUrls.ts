/** ログイン */
export const LOGIN: string = '/admin/auth/login';
/** ログアウト */
export const LOGOUT: string = '/admin/auth/logout';

/** パスワード変更 */
export const RESET_PASSWORD: string = '/api/admin/reset-password';

/** API */
/** ユーザー情報取得 */
export const FETCH_USER: string = '/api/admin/get-user';
/** システム情報取得 */
export const FETCH_SYSTEM: string = '/api/admin/get-system';
/** メニューリストを取得 */
export const FETCH_MENU_ITEMS: string = '/api/admin/get-menu-items';
/** 機能権限選択リストを取得 */
export const FETCH_KINO_AUTH_GRP_MENU_ITEMS: string = '/api/admin/get-kino-auth-grp-menu-items';
/** 輸送業者選択リストを取得 */
export const FETCH_CARRIERS_MENU_ITEMS: string = '/api/admin/get-carriers-menu-items';
/** 倉庫名リストを取得 */
export const FETCH_WAREHOUSES_MENU_ITEMS: string = '/api/admin/get-warehouses-menu-items';

/** ホーム */
export const FETCH_HOME_MENU: string = '/api/admin/home/get-menu';

/** 積付表受渡状況 */
/** 積付表受渡状況一覧: 検索 */
export const LOADING_STATUS_SEARCH: string = '/api/admin/loading-status/search';
/** 積付表受渡状況一覧: 完成連絡 */
export const LOADING_STATUS_COMPLETE: string = '/api/admin/loading-status/complete';
/** 積付表受渡状況一覧: 受付削除 */
export const LOADING_STATUS_DELETE: string = '/api/admin/loading-status/delete';

/** 待機積込状況 */
/** 待機積込状況: メニュー取得 */
export const FETCH_PENDING_LOADING_STATUS_MENU: string = '/api/admin/pending-loading-status/get-menu';
/** 倉庫状況: 検索 */
export const WAREHOUSE_STATUS_SERACH: string = '/api/admin/pending-loading-status/warehouse-status/search';
/** 倉庫状況: 人数変更 */
export const WAREHOUSE_STATUS_CHANGE: string = '/api/admin/pending-loading-status/warehouse-status/change';
/** 倉庫状況: 詳細 */
export const WAREHOUSE_STATUS_DETAIL: string = '/api/admin/pending-loading-status/warehouse-status/detail';

/** お知らせ管理 */
/** お知らせ管理: メニュー取得 */
export const FETCH_NOTICE_MENU: string = '/api/admin/notice/get-menu';
/** 共通お知らせ: 詳細 */
export const NOTICE_GENERAL_DETAIL: string = '/api/admin/notice/general/detail';
/** 共通お知らせ: 編集 */
export const NOTICE_GENERAL_EDIT: string = '/api/admin/notice/general/edit';
/** 個別お知らせ: 検索 */
export const NOTICE_INDIVIDUAL_SEARCH: string = '/api/admin/notice/individual/search';
/** 個別お知らせ: 詳細 */
export const NOTICE_INDIVIDUAL_DETAIL: string = '/api/admin/notice/individual/detail';
/** 個別お知らせ: 編集 */
export const NOTICE_INDIVIDUAL_EDIT: string = '/api/admin/notice/individual/edit';

/** 帳票出力 */

/** マスタ */
/** マスタメニュー取得 */
export const FETCH_MASTER_MENU: string = '/api/admin/master/get-menu';
/** 担当者マスタ: 検索 */
export const CONTACT_PERSON_SEARCH: string = '/api/admin/master/contact-person/search';
/** 担当者マスタ: 詳細 */
export const CONTACT_PERSON_DETAIL: string = '/api/admin/master/contact-person/detail';
/** 担当者マスタ: 追加 */
export const CONTACT_PERSON_ADD: string = '/api/admin/master/contact-person/add';
/** 担当者マスタ: 編集 */
export const CONTACT_PERSON_EDIT: string = '/api/admin/master/contact-person/edit';
/** 担当者マスタ: パスワード変更 */
export const CONTACT_PERSON_RESET_PASSWORD: string = '/api/admin/master/contact-person/reset-password';
/** 担当者マスタ: 削除 */
export const CONTACT_PERSON_DELETE: string = '/api/admin/master/contact-person/delete';
/** 車両マスタ: 検索 */
export const TRANSPORT_VEHICLE_SEARCH: string = '/api/admin/master/transport-vehicle/search';
/** 車両マスタ: 詳細 */
export const TRANSPORT_VEHICLE_DETAIL: string = '/api/admin/master/transport-vehicle/detail';
/** 車両マスタ: 追加 */
export const TRANSPORT_VEHICLE_ADD: string = '/api/admin/master/transport-vehicle/add';
/** 車両マスタ: 編集 */
export const TRANSPORT_VEHICLE_EDIT: string = '/api/admin/master/transport-vehicle/edit';
/** 車両マスタ: 削除 */
export const TRANSPORT_VEHICLE_DELETE: string = '/api/admin/master/transport-vehicle/delete';
/** 倉庫マスタ: 検索 */
export const WAREHOUSE_SEARCH: string = '/api/admin/master/warehouse/search';
/** 倉庫マスタ: 詳細 */
export const WAREHOUSE_DETAIL: string = '/api/admin/master/warehouse/detail';
/** 倉庫マスタ: 最大値表示番号取得 */
export const WAREHOUSE_MAX_SORT_ORDER: string = '/api/admin/master/warehouse/max-sort-order';
/** 倉庫マスタ: 追加 */
export const WAREHOUSE_ADD: string = '/api/admin/master/warehouse/add';
/** 倉庫マスタ: 編集 */
export const WAREHOUSE_EDIT: string = '/api/admin/master/warehouse/edit';
/** 倉庫マスタ: 削除 */
export const WAREHOUSE_DELETE: string = '/api/admin/master/warehouse/delete';
/** システム設定: 詳細 */
export const SYSTEM_SETTINGS_DETAIL: string = '/api/admin/master/system-settings/detail';
/** システム設定: 編集 */
export const SYSTEM_SETTINGS_EDIT: string = '/api/admin/master/system-settings/edit';
