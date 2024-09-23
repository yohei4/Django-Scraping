import React from "react";
import { PageTitle } from "@components/molecules/PageTitle";
import { CardLinks, CardLinksProps } from "@components/molecules/CardLinks";

export interface HomeTemplateProps extends CardLinksProps {
};

export const HomeTemplate :React.FC<HomeTemplateProps> = (props) => {
    return (
        <React.Fragment>
            <PageTitle text="ホーム" sx={{ mb: 4 }}></PageTitle>
            <CardLinks cards={props.cards} />
        </React.Fragment>
    );
};