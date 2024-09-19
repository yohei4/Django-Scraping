import { useState } from 'react';
import { CardLinkProps } from '@app/admin/components/atoms/CardLink';
import { ReportTemplate } from '@app/admin/components/templates/report/ReportTemplate';
import { ReportCards } from './ReportCards';

export const Report = () => {
    const [cards, setCards] = useState<CardLinkProps[]>(ReportCards);

    return (
        <ReportTemplate cards={cards} />
    );
};
