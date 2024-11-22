import { Button, ButtonProps } from './Button';

interface SearchButtonProps extends ButtonProps {
}

export const SearchButton : React.FC<SearchButtonProps> = (props: SearchButtonProps) => {
    
    return (
        <Button {...props} color='default' variant='contained' startIconName='Search'>{props.children}</Button>
    );
}
