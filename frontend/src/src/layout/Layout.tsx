import { ReactNode, useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/Theme";
import { Menu } from "@/components/organisms/Menu";
import { Main } from "@/components/organisms/Main";
import { SideBarTreeProps } from "@/components/molecules/SideBarTree";

export interface LayoutProps {
    children?: ReactNode;
    sideBarTree?: SideBarTreeProps[];
    appBarRightToolbar?: React.ReactNode;
};

export const Layout : React.FC<LayoutProps> = ({
    children,
    sideBarTree,
    appBarRightToolbar
}) => {
    // サイドバー開閉イベント
    const [open, setOpen] = useState(theme.sideBar.open);
    const handleSideBarToggle = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box>
                <Menu title={theme.sideBar.title} icon={theme.sideBar.icon} position="static" sideBarTree={sideBarTree} open={open} onClick={handleSideBarToggle} appBarRightToolbar={appBarRightToolbar} />
                <Main open={open}>
                    {children}
                </Main>
            </Box>
        </ThemeProvider>
    );
};