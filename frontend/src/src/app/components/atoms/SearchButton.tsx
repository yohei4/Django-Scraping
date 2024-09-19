import { DefaultButton, DefaultButtonProps } from "@components/atoms/DefaultButton";


interface SearchButtonProps extends DefaultButtonProps {
}

export const SearchButton : React.FC<SearchButtonProps> = (props: SearchButtonProps) => {
    return (
        <DefaultButton {...props} startIconName='Search'>{props.children}</DefaultButton>
    );
}