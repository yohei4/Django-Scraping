import { Typography } from "@mui/material";

interface CopyrightProps {
    text: string;
}

export const Copyright = (props: CopyrightProps) => {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {['Copyright', '©', props.text, new Date().getFullYear(), '.'].join(' ')}
      </Typography>
    );
};