import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { LoginForm } from '@/components/Form';
import { Main } from "./index";

export const Login = () => {
    return (
        <Main component="main" id="main">
            <Box component='div' className="page-content">
                {/* <Box component='div' className="screen-title__wrap">
                    <Typography variant="h1" className="title">ログイン画面</Typography>
                </Box> */}
                <Box component='div' className="content-wrap">
                    <Box component='div' className="form-title">
                        <Typography variant="h2">メールアドレスでログイン</Typography>
                    </Box>
                    <LoginForm />
                    <Box component='div' className="add-account__url">
                        <Typography variant="caption">新規アカウントの作成は<Link to="/register">こちら</Link></Typography>
                    </Box>
                </Box>
            </Box>
        </Main>
    );
}
