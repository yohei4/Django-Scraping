import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IMenu } from "@app/admin/interfaces/IMenu";
import { selectItems } from "@app/admin/features/menu/menu.selectors";
import { resetMenu as resetMenuState, setMenu } from "@app/admin/features/menu/menu.slice";
import { SideBarTreeProps } from "@components/molecules/SideBarTree";
import { useEffect, useState } from "react";

type UseMenuResult = {
    items: IMenu[];
    sidebar: SideBarTreeProps[];
    updateMenu: (newMenu: IMenu[]) => void;
    resetMenu: () => void;
}

export const useMenu = (): UseMenuResult => {
    const dispatch = useDispatch();
    const items = useSelector(selectItems);
    const [sidebar, setSideBar] = useState<SideBarTreeProps[]>([]);

    useEffect(() => {
        if(Array.isArray(items)) {
                setSideBar(items.map((row) => {
                    return {
                        icon: row.IconNm,
                        text: row.MenuNm,
                        path: row.Url,
                        children: row.Children?.map((child) => {
                            return {
                                text: child.MenuNm,
                                path: child.Url,
                            };
                        })
                    };
                }));
        }
    }, [items]);

    const updateMenu = (newMenu: IMenu[]) => {
        dispatch(setMenu(newMenu));
    };

    const resetMenu = () => {
        dispatch(resetMenuState());
    };

    return {
        items,
        sidebar,
        updateMenu,
        resetMenu,
    };
};