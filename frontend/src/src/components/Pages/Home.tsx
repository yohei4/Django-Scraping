import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <Box>
            <Link to='/login'>ログイン画面へ</Link>
            <Link to='/register'>新規アカウント作成画面へ</Link>
        </Box>
    );
}
