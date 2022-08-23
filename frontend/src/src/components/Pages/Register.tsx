import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { RegisterForm } from '@/components/Form';
import { styled } from '@mui/material/styles';

const Main = styled(Box<"main">)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100px",
    height: "100%",
    width: "100%",
    "& .page-content": {
        "& .screen-title__wrap": {
            marginBottom: "46px",
            "& .title": {
                fontSize: "27px",
            }
        },
        "& .content-wrap": {
            backgroundColor: "#FFFFFF",
            padding: "40px 90px",
            margin: "0 auto auto",
            borderRadius: "5px",
            "& .form-title": {
                "& h2": {
                    fontSize: "20px",
                }
            }
        }
    }
});

export default function Register() {
    return (
        <Main component="main" id="main">
            <Box component='div' className="page-content">
                <Box component='div' className="screen-title__wrap">
                <Typography variant="h1" className="title">新規アカウント作成画面</Typography>
                </Box>
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
