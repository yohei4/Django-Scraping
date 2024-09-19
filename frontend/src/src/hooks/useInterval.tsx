import { useEffect, useRef } from 'react';

export type UseIntervalCallback = () => void;

export type UseIntervalResult = {
    clear: () => void;
    start: () => void;
}

export const useInterval = (callback: UseIntervalCallback, interval?: number): UseIntervalResult => {
    const savedCallback = useRef<UseIntervalCallback>();
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    // 最新のコールバックを保存するための useEffect
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            if (savedCallback.current) {
                savedCallback.current();
            }
        };

        if (interval) {
            intervalId.current = setInterval(tick);
        }

        // クリーンアップ関数
        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };

    }, [interval]);

    const clear = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
        }
    };

    const start = () => {
        if (interval) {
            clear();
            intervalId.current = setInterval(() => {
                if (savedCallback.current) {
                    savedCallback.current();
                }
            }, interval);
        }
    };

    return {
        clear,
        start
    };
};
