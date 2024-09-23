import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SideBarTreeItem, SideBarTreeItemProps } from "@components/atoms/SideBarTreeItem";

export interface SideBarTreeProps extends SideBarTreeItemProps {
}

export const SideBarTree = (props: SideBarTreeProps) => {

    const [isExpandable, setIsExpandable] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setIsExpandable(Boolean(0 < (props.children?.length ?? 0)));
    }, [props.children]);

    return (
        !isExpandable && props.path ?
        <Link to={props.path} ><SideBarTreeItem {...props} onClick={handleClick} isExpandable={isExpandable} open={open} /></Link> :
        <SideBarTreeItem {...props} onClick={handleClick} isExpandable={isExpandable} open={open} />
    );
};