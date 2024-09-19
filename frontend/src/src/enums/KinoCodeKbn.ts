import { MenuItemProps } from "@mui/material";

/**
 * 機能コード区分
 */
export enum KinoCodeKbn {
    /**
     * ログイン
     */
    SAZ0101 = 1,
    /**
     * 権限エラー
     */
    SAZ0901 = 2,
    /**
     * メニュー(ホーム含む)
     */
    SAZ1001 = 3,
    /**
     * パスワード変更
     */
    SAZ1101 = 4,
    /**
     * マスタ
     */
    SAA0001 = 5,
    /**
     * 担当者一覧
     */
    SAA0101 = 6,
    /**
     * 担当者詳細
     */
    SAA0102 = 7,
    /**
     * 担当者登録
     */
    SAA0103 = 8,
    /**
     * 担当者更新
     */
    SAA0104 = 9,
    /**
     * 担当者削除
     */
    SAA0105 = 10,
    /**
     * 車両一覧
     */
    SAA0201 = 11,
    /**
     * 車両詳細
     */
    SAA0202 = 12,
    /**
     * 車両登録
     */
    SAA0203 = 13,
    /**
     * 車両更新
     */
    SAA0204 = 14,
    /**
     * 車両削除
     */
    SAA0205 = 15,
    /**
     * 倉庫一覧
     */
    SAA0301 = 16,
    /**
     * 倉庫詳細
     */
    SAA0302 = 17,
    /**
     * 倉庫登録
     */
    SAA0303 = 18,
    /**
     * 倉庫更新
     */
    SAA0304 = 19,
    /**
     * 倉庫削除
     */
    SAA0305 = 20,
    /**
     * システム設定
     */
    SAA0401 = 21,
    /**
     * システム設定更新
     */
    SAA0402 = 22,
    /**
     * お知らせ管理
     */
    SAB0001 = 23,
    /**
     * 共通お知らせ設定
     */
    SAB0101 = 24,
    /**
     * 個別お知らせ一覧
     */
    SAB0201 = 25,
    /**
     * 個別お知らせ設定
     */
    SAB0202 = 26,
    /**
     * 積付表受渡状況
     */
    SAC0001 = 27,
    /**
     * 積付表受渡状況一覧
     */
    SAC0101 = 28,
    /**
     * 待機積込状況
     */
    SAD0001 = 29,
    /**
     * 倉庫待機状況一覧
     */
    SAD0101 = 30,
    /**
     * 倉庫待機状況詳細
     */
    SAD0102 = 31,
    /**
     * 車両待機状況一覧
     */
    SAD0201 = 32,
    /**
     * 車両積込状況詳細
     */
    SAD0202 = 33,
    /**
     * 帳票出力
     */
    SAE0001 = 34,
    /**
     * 倉庫別荷役時間
     */
    SAE0101 = 35,
    /**
     * 車両別荷役時間
     */
    SAE0201 = 36,
    /**
     * 車両別荷役時間詳細
     */
    SAE0202 = 37,
    /**
     * 権限エラー
     */
    SBZ0901 = 38,
    /**
     * 受付登録
     */
    SBA0101 = 39,
    /**
     * 受付待ち
     */
    SBB0101 = 40,
    /**
     * 積付倉庫登録
     */
    SBC0101 = 41,
    /**
     * 積込状況全体
     */
    SBD0101 = 42,
    /**
     * 積込状況倉庫
     */
    SBE0101 = 43,
    /**
     * 積込完了
     */
    SBF0101 = 44,
    /**
     * API送信
     */
    SCA0101 = 45,
}

/**
 * 表示用名称を取得します。
 */
export const KinoCodeKbnDisplayNames: { [key in KinoCodeKbn]: string } = {
    [KinoCodeKbn.SAZ0101]: 'ログイン',
    [KinoCodeKbn.SAZ0901]: '権限エラー',
    [KinoCodeKbn.SAZ1001]: 'メニュー(ホーム含む)',
    [KinoCodeKbn.SAZ1101]: 'パスワード変更',
    [KinoCodeKbn.SAA0001]: 'マスタ',
    [KinoCodeKbn.SAA0101]: '担当者一覧',
    [KinoCodeKbn.SAA0102]: '担当者詳細',
    [KinoCodeKbn.SAA0103]: '担当者登録',
    [KinoCodeKbn.SAA0104]: '担当者更新',
    [KinoCodeKbn.SAA0105]: '担当者削除',
    [KinoCodeKbn.SAA0201]: '車両一覧',
    [KinoCodeKbn.SAA0202]: '車両詳細',
    [KinoCodeKbn.SAA0203]: '車両登録',
    [KinoCodeKbn.SAA0204]: '車両更新',
    [KinoCodeKbn.SAA0205]: '車両削除',
    [KinoCodeKbn.SAA0301]: '倉庫一覧',
    [KinoCodeKbn.SAA0302]: '倉庫詳細',
    [KinoCodeKbn.SAA0303]: '倉庫登録',
    [KinoCodeKbn.SAA0304]: '倉庫更新',
    [KinoCodeKbn.SAA0305]: '倉庫削除',
    [KinoCodeKbn.SAA0401]: 'システム設定',
    [KinoCodeKbn.SAA0402]: 'システム設定更新',
    [KinoCodeKbn.SAB0001]: 'お知らせ管理',
    [KinoCodeKbn.SAB0101]: '共通お知らせ設定',
    [KinoCodeKbn.SAB0201]: '個別お知らせ一覧',
    [KinoCodeKbn.SAB0202]: '個別お知らせ設定',
    [KinoCodeKbn.SAC0001]: '積付表受渡状況',
    [KinoCodeKbn.SAC0101]: '積付表受渡状況一覧',
    [KinoCodeKbn.SAD0001]: '待機積込状況',
    [KinoCodeKbn.SAD0101]: '倉庫待機状況一覧',
    [KinoCodeKbn.SAD0102]: '倉庫待機状況詳細',
    [KinoCodeKbn.SAD0201]: '車両待機状況一覧',
    [KinoCodeKbn.SAD0202]: '車両積込状況詳細',
    [KinoCodeKbn.SAE0001]: '帳票出力',
    [KinoCodeKbn.SAE0101]: '倉庫別荷役時間',
    [KinoCodeKbn.SAE0201]: '車両別荷役時間',
    [KinoCodeKbn.SAE0202]: '車両別荷役時間詳細',
    [KinoCodeKbn.SBZ0901]: '権限エラー',
    [KinoCodeKbn.SBA0101]: '受付登録',
    [KinoCodeKbn.SBB0101]: '受付待ち',
    [KinoCodeKbn.SBC0101]: '積付倉庫登録',
    [KinoCodeKbn.SBD0101]: '積込状況全体',
    [KinoCodeKbn.SBE0101]: '積込状況倉庫',
    [KinoCodeKbn.SBF0101]: '積込完了',
    [KinoCodeKbn.SCA0101]: 'API送信',
};

/**
 * 区分数値を取得します。
 */
export const KinoCodeKbnValues: { [key in KinoCodeKbn]: number } = {
    [KinoCodeKbn.SAZ0101]: 1,
    [KinoCodeKbn.SAZ0901]: 1,
    [KinoCodeKbn.SAZ1001]: 1,
    [KinoCodeKbn.SAZ1101]: 2,
    [KinoCodeKbn.SAA0001]: 1,
    [KinoCodeKbn.SAA0101]: 1,
    [KinoCodeKbn.SAA0102]: 1,
    [KinoCodeKbn.SAA0103]: 1,
    [KinoCodeKbn.SAA0104]: 1,
    [KinoCodeKbn.SAA0105]: 1,
    [KinoCodeKbn.SAA0201]: 1,
    [KinoCodeKbn.SAA0202]: 1,
    [KinoCodeKbn.SAA0203]: 1,
    [KinoCodeKbn.SAA0204]: 1,
    [KinoCodeKbn.SAA0205]: 1,
    [KinoCodeKbn.SAA0301]: 1,
    [KinoCodeKbn.SAA0302]: 1,
    [KinoCodeKbn.SAA0303]: 1,
    [KinoCodeKbn.SAA0304]: 1,
    [KinoCodeKbn.SAA0305]: 1,
    [KinoCodeKbn.SAA0401]: 1,
    [KinoCodeKbn.SAA0402]: 1,
    [KinoCodeKbn.SAB0001]: 1,
    [KinoCodeKbn.SAB0101]: 1,
    [KinoCodeKbn.SAB0201]: 1,
    [KinoCodeKbn.SAB0202]: 1,
    [KinoCodeKbn.SAC0001]: 1,
    [KinoCodeKbn.SAC0101]: 1,
    [KinoCodeKbn.SAD0001]: 1,
    [KinoCodeKbn.SAD0101]: 1,
    [KinoCodeKbn.SAD0102]: 1,
    [KinoCodeKbn.SAD0201]: 1,
    [KinoCodeKbn.SAD0202]: 1,
    [KinoCodeKbn.SAE0001]: 1,
    [KinoCodeKbn.SAE0101]: 1,
    [KinoCodeKbn.SAE0201]: 1,
    [KinoCodeKbn.SAE0202]: 1,
    [KinoCodeKbn.SBZ0901]: 2,
    [KinoCodeKbn.SBA0101]: 2,
    [KinoCodeKbn.SBB0101]: 2,
    [KinoCodeKbn.SBC0101]: 2,
    [KinoCodeKbn.SBD0101]: 2,
    [KinoCodeKbn.SBE0101]: 2,
    [KinoCodeKbn.SBF0101]: 2,
    [KinoCodeKbn.SCA0101]: 3,
};

/**
 * keyを取得します。
 */
export const KinoCodeKbnKeys: { [key in KinoCodeKbn]: string } = {
    [KinoCodeKbn.SAZ0101]: 'SAZ0101',
    [KinoCodeKbn.SAZ0901]: 'SAZ0901',
    [KinoCodeKbn.SAZ1001]: 'SAZ1001',
    [KinoCodeKbn.SAZ1101]: 'SAZ1101',
    [KinoCodeKbn.SAA0001]: 'SAA0001',
    [KinoCodeKbn.SAA0101]: 'SAA0101',
    [KinoCodeKbn.SAA0102]: 'SAA0102',
    [KinoCodeKbn.SAA0103]: 'SAA0103',
    [KinoCodeKbn.SAA0104]: 'SAA0104',
    [KinoCodeKbn.SAA0105]: 'SAA0105',
    [KinoCodeKbn.SAA0201]: 'SAA0201',
    [KinoCodeKbn.SAA0202]: 'SAA0202',
    [KinoCodeKbn.SAA0203]: 'SAA0203',
    [KinoCodeKbn.SAA0204]: 'SAA0204',
    [KinoCodeKbn.SAA0205]: 'SAA0205',
    [KinoCodeKbn.SAA0301]: 'SAA0301',
    [KinoCodeKbn.SAA0302]: 'SAA0302',
    [KinoCodeKbn.SAA0303]: 'SAA0303',
    [KinoCodeKbn.SAA0304]: 'SAA0304',
    [KinoCodeKbn.SAA0305]: 'SAA0305',
    [KinoCodeKbn.SAA0401]: 'SAA0401',
    [KinoCodeKbn.SAA0402]: 'SAA0402',
    [KinoCodeKbn.SAB0001]: 'SAB0001',
    [KinoCodeKbn.SAB0101]: 'SAB0101',
    [KinoCodeKbn.SAB0201]: 'SAB0201',
    [KinoCodeKbn.SAB0202]: 'SAB0202',
    [KinoCodeKbn.SAC0001]: 'SAC0001',
    [KinoCodeKbn.SAC0101]: 'SAC0101',
    [KinoCodeKbn.SAD0001]: 'SAD0001',
    [KinoCodeKbn.SAD0101]: 'SAD0101',
    [KinoCodeKbn.SAD0102]: 'SAD0102',
    [KinoCodeKbn.SAD0201]: 'SAD0201',
    [KinoCodeKbn.SAD0202]: 'SAD0202',
    [KinoCodeKbn.SAE0001]: 'SAE0001',
    [KinoCodeKbn.SAE0101]: 'SAE0101',
    [KinoCodeKbn.SAE0201]: 'SAE0201',
    [KinoCodeKbn.SAE0202]: 'SAE0202',
    [KinoCodeKbn.SBZ0901]: 'SBZ0901',
    [KinoCodeKbn.SBA0101]: 'SBA0101',
    [KinoCodeKbn.SBB0101]: 'SBB0101',
    [KinoCodeKbn.SBC0101]: 'SBC0101',
    [KinoCodeKbn.SBD0101]: 'SBD0101',
    [KinoCodeKbn.SBE0101]: 'SBE0101',
    [KinoCodeKbn.SBF0101]: 'SBF0101',
    [KinoCodeKbn.SCA0101]: 'SCA0101',
};

/**
 * optionsを取得します。
 * @returns 
 */
export const getKinoCodeKbnOptions = (): MenuItemProps[] => {
    return Object.values(KinoCodeKbn).filter(kbn => typeof kbn === 'number').map((kbn, index) => ({ value: kbn, children: KinoCodeKbnDisplayNames[kbn as KinoCodeKbn] }));
};

