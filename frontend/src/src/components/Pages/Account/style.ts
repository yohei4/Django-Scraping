import { Box } from "@mui/system";
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Main = styled(Box<"main">)({
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

export const FormBox = styled(Box<"form">)({
    marginTop: '20px',
});

export const FormButton = styled(Button)({
    cursor: 'pointer',
    border: 'none',
    width: '300px',
    padding: '10px 15px',
    margin: '35px auto 40px',
    color: '#FFFFFF',
    backgroundColor: '#57BAD1',
    fontSize: '18px',
    transition: 'all .3s',
    '&:hover': {
        backgroundColor: '#3fa2b8',
        transition: 'all .3s',
    }
});