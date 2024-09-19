import React from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { CardLinks, CardLinksProps } from "@app/admin/components/molecules/CardLinks";

export interface PendingLoadingStatusTemplateProps extends CardLinksProps {
};

export const PendingLoadingStatusTemplate :React.FC<PendingLoadingStatusTemplateProps> = (props) => {
    return (
        <React.Fragment>
            <PageTitle text="待機積込状況" sx={{ mb: 4 }}></PageTitle>
            <CardLinks cards={props.cards} />
        </React.Fragment>
    );
};