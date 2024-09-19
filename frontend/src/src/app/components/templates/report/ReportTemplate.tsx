import React from "react";
import { PageTitle } from "@app/admin/components/molecules/PageTitle";
import { CardLinks, CardLinksProps } from "@app/admin/components/molecules/CardLinks";

export interface ReportTemplateProps extends CardLinksProps {
};

export const ReportTemplate :React.FC<ReportTemplateProps> = (props) => {
    return (
        <React.Fragment>
            <PageTitle text="帳票出力" sx={{ mb: 4 }}></PageTitle>
            <CardLinks cards={props.cards} />
        </React.Fragment>
    );
};
