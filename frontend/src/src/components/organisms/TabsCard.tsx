import React from "react";
import { Card, CardContent } from "@mui/material";
import { Tabs, TabsProps } from "./Tabs";

export interface TabsCardProps extends TabsProps {
};

export const TabsCard: React.FC<TabsCardProps> = (props: TabsCardProps) => {
    return (
        <Card sx={props.sx}>
            <CardContent sx={{ padding: 0, '&:last-child': {paddingBottom: 0} }}>
                <Tabs
                    {...props}
                />
            </CardContent>
        </Card>
    );
};