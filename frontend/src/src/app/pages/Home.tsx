import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { HomeTemplate } from '@app/components/templates/HomeTemplate';
import { CardLinkProps } from "@components/atoms/CardLink";

export const HomeLoader = async ({ params }: LoaderFunctionArgs): Promise<CardLinkProps[]> => {
    return [
        {
            text: '写真一覧',
            path: '',
            icon: 'PhotoLibrary',
        },
        {
            text: 'スクレイピング',
            path: '',
            icon: 'ImageSearch',
        },
    ];
}

export const Home = () => {
    const data = useLoaderData() as CardLinkProps[];

    return (
        <HomeTemplate cards={data} />
    );
};
