import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { selectLoading } from "@app/features/loading/loading.selectors";
import { resetLoading as resetLoadingState, setLoading } from "@features/loading/loading.slice";

type UseLoadingResult = {
    loading: boolean;
    updateLoading: (newLoading: boolean) => void;
    resetLoading: () => void;
}

export const useLoading = (): UseLoadingResult => {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);

    const updateLoading = (newLoading: boolean) => {
        dispatch(setLoading(newLoading));
    };

    const resetLoading = () => {
        dispatch(resetLoadingState());
    };

    return {
        loading,
        updateLoading,
        resetLoading,
    };
};