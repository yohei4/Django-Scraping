import React from "react";
import { AppBar, Box, CssBaseline, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { theme } from "@/theme/Theme";

export interface ErrorLayoutProps {
    children?: React.ReactNode;
};

export const ErrorLayout : React.FC<ErrorLayoutProps> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <Box>
                <CssBaseline />
                <AppBar position='static' sx={{ textAlign: 'center' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            {theme.appBar.title}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    sx={( theme ) => ({
                        padding: `${theme.spacing(5)} ${theme.spacing(5)}`,
                        textAlign: 'center',
                    })}
                >
                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    );
};
