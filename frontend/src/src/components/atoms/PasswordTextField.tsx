import { Visibility, VisibilityOff } from "@mui/icons-material";
import { BaseTextFieldProps, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Controller, ControllerProps, UseControllerProps, useFormContext } from "react-hook-form";

export type PasswordTextFieldProps = BaseTextFieldProps & UseControllerProps & {
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    readOnly?: boolean;
};

export const PasswordTextField = (props: PasswordTextFieldProps) => {
    const control = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <Controller
            name={props.name}
            control={control.control}
            rules={props.rules}
            disabled={props.disabled}
            defaultValue=''
            render={({ field, formState: { errors } }) => {
                const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
                    field.onChange(event);
                    if (props.onChange) props.onChange(event);
                };
                return (
                    <FormControl variant="outlined" margin={props.margin} fullWidth={props.fullWidth} >
                        {
                            props.label ?
                            <InputLabel error={errors[props.name] ? true : props.error} htmlFor={props.id} required={props.required}>{props.label}</InputLabel> :
                            null
                        }
                        <OutlinedInput
                            {...field}
                            id={props.id}
                            type={showPassword ? 'text' : 'password'}
                            error={errors[props.name] ? true : props.error}
                            required={props.required}
                            onChange={handleChange}
                            autoComplete={props.autoComplete}
                            label={props.label}
                            sx={{
                                '& .MuiInputBase-input[name="password"]': {
                                    // edge パスワードボタン非表示化
                                    '&::-ms-reveal': {
                                        display: 'none',
                                    }
                                }
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                             />
                        <FormHelperText error={errors[props.name] ? true : props.error}>
                            {errors[props.name]?.message as string ?? props.helperText}
                        </FormHelperText>
                    </FormControl>
                );
            }}
        />
    );
};
