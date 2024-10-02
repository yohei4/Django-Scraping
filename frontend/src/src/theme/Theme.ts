import { createTheme } from "@mui/material";
import * as Icons from '@mui/icons-material';
import { grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
    interface Theme {
        sideBar: {
            width: number;
            open: boolean;
            backgroundColor: string;
            title: string;
            icon?: keyof typeof Icons;
            header: {
                backgroundColor: string;
            };
        };
        appBar: {
            title: string;
            backgroundColor: string;
        };
        dialog: {
            default: {
                header: {
                    backgroundColor: string;
                    color: string;
                }
            },
            danger: {
                header: {
                    backgroundColor: string;
                    color: string;
                }
            }
        };
    }

    interface ThemeOptions {
        sideBar: {
            width: number;
            open: boolean;
            backgroundColor: string;
            title: string;
            icon?: keyof typeof Icons;
            header: {
                backgroundColor: string;
            };
        };
        appBar: {
            title: string;
            backgroundColor: string;
        };
        dialog: {
            default: {
                header: {
                    backgroundColor: string;
                    color: string;
                }
            },
            danger: {
                header: {
                    backgroundColor: string;
                    color: string;
                }
            }
        };
    }
}

const customTheme = createTheme({
    sideBar: {
        width: 240,
        open: false,
        backgroundColor: '#595959',
        title: 'ISSA',
        icon: 'Alarm',
        header: {
            backgroundColor: '#056c02',
        }
    },
    appBar: {
        title: 'ISSA',
        backgroundColor: '#056c02',
    },
    dialog: {
        default: {
            header: {
                backgroundColor: '#056c02',
                color: '#FFF',
            }
        },
        danger: {
            header: {
                backgroundColor: '#C00000',
                color: '#FFF',
            }
        },
    },
    palette: {
        danger: {
            main: '#C00000',
            light: '#C00000',
            dark: '#C00000',
            contrastText: '#FFF',
        },
        default: {
            main: '#056c02',
            light: '#056c02',
            dark: '#056c02',
            contrastText: '#FFF',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: 'hsla(215, 15%, 97%, 0.5)',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: 'outlined',
            }
        },
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    // minWidth: '6rem',
                }
            },
        },
        MuiSvgIcon: {
            variants: [
                {
                    props: { fontSize: 'bigger' },
                    style: {
                        fontSize: '5rem',
                        fontWeight: 'bolder',
                    },
                },
            ],
        },
    },
    typography: {
        pageTitle: {
            fontSize: '2rem',
        },
        gridFormLabel: {
            fontSize: '1rem',
            fontWeight: 'bold',
        }
    }
});

export const theme = createTheme(customTheme, {
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: customTheme.appBar.backgroundColor,
                },
            },
        },
        MuiAlert: {
            variants: [
                {
                    props: { severity: 'default' },
                    style: {
                        backgroundColor: customTheme.palette.default.main,
                        color: customTheme.palette.default.contrastText
                    }
                },
                {
                    props: { color: 'default' },
                    style: {
                        backgroundColor: customTheme.palette.default.main,
                        color: customTheme.palette.default.contrastText
                    }
                },
                {
                    props: { severity: 'danger' },
                    style: {
                        backgroundColor: customTheme.palette.danger.main,
                        color: customTheme.palette.danger.contrastText
                    }
                },
                {
                    props: { color: 'danger' },
                    style: {
                        backgroundColor: customTheme.palette.danger.main,
                        color: customTheme.palette.danger.contrastText
                    }
                },
                {
                    props: { severity: 'grey' },
                    style: {
                        backgroundColor: grey[200],
                        color: grey[900]
                    }
                },
                {
                    props: { color: 'grey' },
                    style: {
                        backgroundColor: grey[300],
                        color: grey[900]
                    }
                },
            ]
        }
    },
    typography: {
        pageTitle: {
            [customTheme.breakpoints.down('sm')]: {
                fontSize: '1rem',
            }
        },
        error: {
            color: customTheme.palette.error.main,
        },
    }
});
