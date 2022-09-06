import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { LoginForm } from '@/components/Form';
import { styled } from '@mui/material/styles';

const Main = styled(Box<"main">)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "60px",
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

export default function Login() {
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
