import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IUser } from "@app/interfaces/IUser";
import { selectUser } from "@app/features/user/user.selectors";
import { resetUser as resetUserState, setUser } from "@app/features/user/user.slice";

type UseUserResult = {
    user: IUser;
    updateUser: (newUser: IUser) => void;
    resetUser: () => void;
}

export const useUser = (): UseUserResult => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const updateUser = (newUser: IUser) => {
        dispatch(setUser(newUser));
    };

    const resetUser = () => {
        dispatch(resetUserState());
    };

    return {
        user,
        updateUser,
        resetUser,
    };
};