import React from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { CardLinks, CardLinksProps } from "@app/admin/components/molecules/CardLinks";

export interface NoticeTemplateProps extends CardLinksProps {
};

export const NoticeTemplate :React.FC<NoticeTemplateProps> = (props) => {
    return (
        <React.Fragment>
            <PageTitle text="お知らせ管理" sx={{ mb: 4 }}></PageTitle>
            <CardLinks cards={props.cards} />
        </React.Fragment>
    );
};