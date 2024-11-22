import React from "react";
import { Control, FieldValues, UseFormReturn } from "react-hook-form";
import { TimeView } from "@mui/x-date-pickers";
import { CheckboxLabelProps } from "@components/atoms/CheckboxLabel";
import { OutlinedTextFieldProps, OutlinedTextField } from "@components/atoms/OutlinedTextField";
import { MenuItemProps, TextFieldProps } from "@mui/material";
import { Select, SelectProps } from "@components/atoms/Select";
import { MultipleSelect, MultipleSelectProps } from "@components/atoms/MultipleSelect";
import { PasswordTextField, PasswordTextFieldProps } from "@components/atoms/PasswordTextField";
import { BoxRadio, BoxRadioProps } from "@components/atoms/BoxRadio";
import { DatePicker, DatePickerProps } from "@components/atoms/DatePicker";
import { DateTimePicker, DateTimePickerProps } from "@components/atoms/DateTimePicker";
import { TimePicker, TimePickerProps } from "@components/atoms/TimePicker";
import { AsyncFreeSolo, AsyncFreeSoloProps } from "@components/atoms/AsyncFreeSolo";
import { TextArea, TextAreaProps } from "@components/atoms/TextArea";
import { AsyncSelect, AsyncSelectProps } from "@components/atoms/AsyncSelect";
import { LazyLoadedComboBox, LazyLoadedComboBoxProps } from "@components/atoms/LazyLoadedComboBox";
import { ComboBox, ComboBoxProps } from "@components/atoms/ComboBox";
import { PreLoadedComboBox, PreLoadedComboBoxProps } from "@components/atoms/PreLoadedComboBox";
import { ReferenceField, ReferenceFieldProps } from "@components/organisms/ReferenceField";
import { OutlinedNumberField, OutlinedNumberFieldProps } from "@components/atoms/OutlinedNumberField";

type BaseFormControlProps<T extends { [key: string]: any } | undefined = any> = {
    name?: T extends undefined ? string : keyof T | (string & {});
    label?: React.ReactNode;
    type: 'text'| 'password' | 'number' | 'date' | 'datetime-local' | 'time' | 'checkbox' | 'radio' | 'textarea' | 'select' | 'multiple-select' | 'combo-box' | 'lazy-loaded-combo-box' | 'pre-loaded-combo-box' | 'free-solo' | 'async-free-solo' | 'async-select';
    options?: MenuItemProps[];
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    control?: Control<FieldValues>;
    error?: boolean;
    format?: string;
    startAdornmentInner?: React.ReactNode;
    endAdornmentInner?: React.ReactNode;
    helperText?: React.ReactNode;
    reference?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
    onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>, methods?: UseFormReturn<any, any, undefined>) => void;
}

export type TextDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & OutlinedTextFieldProps & {
    type: 'text';
}

export type PasswordDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & PasswordTextFieldProps & {
    type: 'password';
}

export type NumberDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & OutlinedNumberFieldProps & {
    type: 'number';
}

export type DateDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & DatePickerProps & {
    type: 'date';
}

export type DateTimeDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & DateTimePickerProps & {
    type: 'datetime-local';
}

export type TimeDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & TimePickerProps & {
    type: 'time';
    format?: string;
    views?: TimeView[];
}

export type CheckBoxDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & CheckboxLabelProps & {
    type: 'checkbox';
    allChecked?: boolean;
}

export type RadioDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & BoxRadioProps & {
    type: 'radio';
}

export type TextAreaDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & TextAreaProps & {
    type: 'textarea';
}

export type SelectDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & SelectProps & {
    type: 'select';
}

export type MultipleSelectDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & MultipleSelectProps & {
    type: 'multiple-select';
}

export type ComboBoxDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & ComboBoxProps & {
    type: 'combo-box';
}

export type LazyLoadedComboBoxDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & LazyLoadedComboBoxProps & {
    type: 'lazy-loaded-combo-box';
}

export type PreLoadedComboBoxDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & PreLoadedComboBoxProps & {
    type: 'pre-loaded-combo-box';
}

export type AsyncFreeSoloDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & AsyncFreeSoloProps & {
    type: 'async-free-solo';
}

export type AsyncSelectDynamicFormControlProps<T extends { [key: string]: any } | undefined = any> = BaseFormControlProps<T> & AsyncSelectProps & {
    type: 'async-select';
}

export type DynamicFormControlProps<T extends { [key: string]: any } | undefined = any> =
    TextDynamicFormControlProps<T> |
    PasswordDynamicFormControlProps<T> |
    NumberDynamicFormControlProps<T> |
    DateDynamicFormControlProps<T> |
    DateTimeDynamicFormControlProps<T> |
    TimeDynamicFormControlProps<T> |
    BaseFormControlProps<T> |
    CheckBoxDynamicFormControlProps<T> |
    RadioDynamicFormControlProps<T> |
    TextAreaDynamicFormControlProps<T> |
    SelectDynamicFormControlProps<T> |
    MultipleSelectDynamicFormControlProps<T> |
    ComboBoxDynamicFormControlProps<T> |
    LazyLoadedComboBoxDynamicFormControlProps<T> |
    PreLoadedComboBoxDynamicFormControlProps<T> |
    AsyncFreeSoloDynamicFormControlProps<T> |
    AsyncSelectDynamicFormControlProps<T>;

export const DynamicFormControl = <T extends { [key: string]: any } | undefined = any>(props: DynamicFormControlProps<T>) => {
    const FormControls = () => {
        if (props.reference) { // 参照の場合
            const referenceFieldProps = props as ReferenceFieldProps;
            return (<ReferenceField {...referenceFieldProps} />);
        }

        switch(props.type) {
            case 'password':
                const passwordProps = props as PasswordTextFieldProps;
                return (<PasswordTextField {...passwordProps} fullWidth />);
            case 'textarea':
                const textAreaProps = props as TextAreaProps;
                return (<TextArea {...textAreaProps} fullWidth />);
            case 'radio':
                const radioProps = props as BoxRadioProps;
                return (<BoxRadio {...radioProps} />);
            case 'select':
                const selectProps = props as SelectProps;
                return (<Select {...selectProps} fullWidth />);
            case 'date':
                const dateProps = props as DatePickerProps;
                return (<DatePicker {...dateProps} />);
            case 'datetime-local':
                const dateTimeProps = props as DateTimePickerProps;
                return (<DateTimePicker {...dateTimeProps} />);
            case 'time':
                const timeProps = props as TimePickerProps;
                return (<TimePicker {...timeProps} />);
            case 'combo-box':
                const comboBoxProps = props as ComboBoxProps;
                return (<ComboBox {...comboBoxProps} fullWidth />);
            case 'lazy-loaded-combo-box':
                const lazyLoadedComboBoxProps = props as LazyLoadedComboBoxProps;
                return (<LazyLoadedComboBox {...lazyLoadedComboBoxProps} fullWidth />);
            case 'pre-loaded-combo-box':
                const preLoadedComboBoxProps = props as PreLoadedComboBoxProps;
                return (<PreLoadedComboBox {...preLoadedComboBoxProps} fullWidth />);
            case 'multiple-select':
                const multipleSelectProps = props as MultipleSelectProps;
                return (<MultipleSelect {...multipleSelectProps} fullWidth />);
            case 'async-free-solo':
                const asyncFreeSoloProps = props as AsyncFreeSoloProps;
                return (<AsyncFreeSolo {...asyncFreeSoloProps} fullWidth />);
            case 'async-select':
                const asyncSelectProps = props as AsyncSelectProps;
                return (<AsyncSelect {...asyncSelectProps} fullWidth />);
            case 'number':
                const numberProps = props as OutlinedNumberFieldProps;
                return (<OutlinedNumberField {...numberProps} type='text' fullWidth />);
            default:
                const textProps = props as OutlinedTextFieldProps;
                return (<OutlinedTextField {...textProps} fullWidth />);
        }
    };

    return (
        <React.Fragment>
            {FormControls()}
        </React.Fragment>
    );
};
