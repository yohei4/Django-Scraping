import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { MSystem } from "@interfaces/MSystem";
import { resetSystem as resetSystemState, setSystem } from "@features/system/system.slice";
import { selectSystem } from "../features/system/system.selectors";

type UseSystemResult = {
    system: MSystem;
    updateSystem: (newSystem: MSystem) => void;
    resetSystem: () => void;
}

export const useSystem = (): UseSystemResult => {
    const dispatch = useDispatch();
    const system = useSelector(selectSystem);

    const updateSystem = (newSystem: MSystem) => {
        dispatch(setSystem(newSystem));
    };

    const resetSystem = () => {
        dispatch(resetSystemState());
    };

    return {
        system,
        updateSystem,
        resetSystem,
    };
};