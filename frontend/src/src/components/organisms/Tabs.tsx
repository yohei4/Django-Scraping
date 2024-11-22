import React from "react";
import { Box, TabsProps as MuiTabsProps, Tab, TabProps as MuiTabProps, Divider } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ConfirmDialog } from "./ConfirmDialog";

interface TabProps extends MuiTabProps {
    panelContent: React.ReactNode;
}

export interface TabsProps extends MuiTabsProps {
    tabs: TabProps[];
    confirmation?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({tabs, confirmation, ...props}) => {
    const [value, setValue] = React.useState<string | number>(0);
    const [newValue, setNewValue] = React.useState<string | number>(0);
    const [message, setMessage] = React.useState<React.ReactNode>('');
    const [open, setOpen] = React.useState<boolean>(false);

    /** タブ切り替えイベント */
    const handleChange = (event: React.SyntheticEvent, newValue: string | number) => {
        setNewValue(newValue);
        setMessage(<>{tabs[newValue as any].label}に切替ます。<br />編集中等のデータは、削除されますがよろしいですか？</>);
        if (confirmation) {
            setOpen(true);
        } else {
            setValue(newValue);
            props.onChange?.(event, newValue);
        }
    };

    /** 確認ダイアログOKボタン */
    const handleYesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
        setValue(newValue);
        props.onChange?.(event, newValue);
    };

    /** 確認ダイアログNOボタン */
    const handleNoClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <TabContext value={value}>
                    <Box>
                        <TabList onChange={handleChange}>
                            {
                                tabs.map(({ panelContent, ...props }, index) => (
                                    <Tab {...props} key={index} value={index} />
                                ))
                            }
                        </TabList>
                    </Box>
                    <Divider />
                    {
                        tabs.map((props, index) => (
                            <TabPanel key={index} value={index}>{props.panelContent}</TabPanel>
                        ))
                    }
            </TabContext>
            <ConfirmDialog
                open={open}
                message={message}
                onYesButtonClick={handleYesClick}
                onNoButtonClick={handleNoClick}
            />
        </React.Fragment>
    );
}