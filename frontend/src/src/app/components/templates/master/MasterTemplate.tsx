import React from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { CardLinks, CardLinksProps } from "@app/admin/components/molecules/CardLinks";

export interface MasterTemplateTemplateProps extends CardLinksProps {
};

export const MasterTemplate :React.FC<MasterTemplateTemplateProps> = (props) => {
    return (
        <React.Fragment>
            <PageTitle text="マスタ" sx={{ mb: 4 }}></PageTitle>
            <CardLinks cards={props.cards} />
        </React.Fragment>
    );
};
