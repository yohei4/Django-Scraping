import { Button, ButtonProps } from './Button';

export interface DangerButtonProps extends ButtonProps {
}

export const DangerButton : React.FC<DangerButtonProps> = (props: DangerButtonProps) => {
    
    return (
        <Button {...props} color='danger'>{props.children}</Button>
    );
}