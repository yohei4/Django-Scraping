import { useEffect, useRef } from 'react';
import { useSystem } from './useSystem';
import { useInterval as useCommonInterval, UseIntervalCallback, UseIntervalResult } from '@hooks/useInterval';

export const useInterval = (callback: UseIntervalCallback): UseIntervalResult => {
    const { system } = useSystem();
    const savedInterval = useRef<number>();
    const { clear, start } = useCommonInterval(callback, savedInterval.current);

    useEffect(() => {
        savedInterval.current = (system.AutoUpdateStaff ?? 60) * 1000;
    }, [system]);

    useEffect(() => {
        if (savedInterval.current !== undefined) {
            start();
        }
        return () => clear();
    }, [savedInterval.current, start, clear]);

    return {
        clear,
        start
    };
};
