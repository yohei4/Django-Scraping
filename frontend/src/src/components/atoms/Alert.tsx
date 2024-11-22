import { Box, Alert as MuiAlert, AlertProps as MuiAlertProps, keyframes } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

export interface AlertProps extends MuiAlertProps {
    message?: string;
    speed?: number;
}

const marquee = keyframes`
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
`;

export const Alert: React.FC<AlertProps> = (props: AlertProps) => {
    const { message, speed = 100 } = props;
    const alertRef = useRef<HTMLDivElement>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(10);

    useEffect(() => {
        if (alertRef.current && messageRef.current && props.message) {
            const alertWidth = alertRef.current.clientWidth;
            const messageWidth = messageRef.current.scrollWidth;
            const calculatedDuration = (messageWidth + alertWidth) / speed;
            setDuration(calculatedDuration);
        }
    }, [props.message]);

    return(
        <MuiAlert
            ref={alertRef}
            variant='standard'
            icon={false}
            square
            onClick={props.onClick}
            sx={((theme) => ({
                display: 'block',
                overflow: 'hidden',
                paddingLeft: 0,
                paddingRight: 0,
                cursor: 'pointer',
                '& .MuiAlert-message': {
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    paddingLeft: '100%',
                    animation: `${marquee} ${duration}s linear infinite`,
                    '& > *': {
                        display: 'inline-block',
                    }
                }
            }))}
        >
            <Box ref={messageRef} className='MuiAlert-message-content'>{message}</Box>
        </MuiAlert>
    );
};
