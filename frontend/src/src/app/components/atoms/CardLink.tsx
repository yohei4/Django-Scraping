import { Icon } from "@components/atoms/Icon";
import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import * as Icons from '@mui/icons-material';
import { Link } from "react-router-dom";

export interface CardLinkProps {
    text?: string;
    path?: string;
    icon?: keyof typeof Icons;
}

export const CardLink = (props: CardLinkProps) => {
    return (
        <Link to={props.path ?? '/'} style={{ textDecoration: 'none' }}>
            <Card
                sx={((theme) => ({
                    backgroundColor: theme.palette.default.main,
                    color: theme.palette.default.contrastText,
                    height: '100%',
                    minHeight: '160px',
                }))}
            >
                <CardContent sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexFlow: 'column',
                    '&:last-child': {paddingBottom: '16px'},
                }}>
                    {
                        props.icon ?
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name={props.icon} fontSize='bigger' />
                        </Box> :
                        null
                    }
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '.2rem' }}>
                        <Typography variant="h6" fontWeight='bold' justifyContent='center' >{props.text}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Link>
    );
};