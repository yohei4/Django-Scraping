import { Button, ButtonProps } from './Button';

interface DefaultButtonProps extends ButtonProps {
}

export const SearchButton : React.FC<DefaultButtonProps> = (props: DefaultButtonProps) => {
    
    return (
        <Button {...props} color='default'>{props.children}</Button>
    );
}
