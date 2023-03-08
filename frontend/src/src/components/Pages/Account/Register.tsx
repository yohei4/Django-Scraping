import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { RegisterForm } from '@/components/Form';
import { Main } from "./index";

export const Register = () => {
    return (
        <Main component="main" id="main">
            <Box component='div' className="page-content">
                {/* <Box component='div' className="screen-title__wrap">
                    <Typography variant="h1" className="title">新規アカウント作成画面</Typography>
                </Box> */}
                <Box component='div' className="content-wrap">
                    <Box component='div' className="form-title">
                        <Typography variant="h2">新規アカウント作成</Typography>
                    </Box>
                    <RegisterForm />
                    <Box component='div' className="login-url">
                        <Typography variant="caption">ログインの方は<Link to="/login">こちら</Link></Typography>
                    </Box>
                </Box>
            </Box>
        </Main>
    );
}
