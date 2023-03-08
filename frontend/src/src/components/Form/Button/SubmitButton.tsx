import { FormButton } from '@/components/Pages/Account/style';

interface ButtonProps {
    type?: "button" | "submit" | "reset" | undefined;
    text: string;
}

export const SubmitButton = (props: ButtonProps) => {
    return (
        <FormButton type="submit">{props.text}</FormButton>
    );
}