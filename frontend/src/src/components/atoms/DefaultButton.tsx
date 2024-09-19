import { Button, ButtonProps } from './Button';

export interface DefaultButtonProps extends ButtonProps {
}

export const DefaultButton : React.FC<DefaultButtonProps> = (props: DefaultButtonProps) => {
    return (
        <Button {...props} color='default'>{props.children}</Button>
    );
}