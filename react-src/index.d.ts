import { ZodType } from 'zod';

type ArrayItemType<T, K = unknown> = T extends Array<infer K> ? K : never;

//https://www.typescriptlang.org/play?#code/C4TwDgpgBAKlC8UDeAoKUCuBnCAnLAXFAIK64CGIAPKuugHbkC2ERtd6AZgJb7BFZgubvQDmAbjQcoAG3KCBQkRKnoAvgBpVUMOVwR6wQqQrV2HRiyIAjAPa2ZEcvUkc1APm3lRrKPQxM1nhSHlroWLYswAAWyorCYq5QnBj0AMZEABQAlAjuUAButtwAJpJqKCigkCRklACSwBBMMOAQVDAaUADSCJj0ANb0tgDu9PmIcBAAHk30JVi1plQinHg9+QD8PVBE9BAFeJKV1dAAYnLA3RAgWB1QM3MLUABKEGm2uCVUggmiXakhqNxl1eogBjdbJxYBMpL1HgZnr9lFBNlIYABtboAXQes0RizOqTSwG4tnoUAAPlAsCBAg5UVJ9odcFIiJicXinosTJQqIDhmMtlJeSBGs1WpAOljsfkEfNFm8Pl8fkoxADBoLxqioAADAAkSG6agxhv8gTwamxADpDRdyFcbndReKWm1pTj3O41LrdnrDcbTUhzUFcFbdWzYDKuQTXu9Pt9ker+kChTqDUa1LakPbHbcPbKfX7upHmcEqm1YBR6FhOJ8mPd5c8lQnVX8NanxhNkKp9OQSuSZCAoFioCIoLnrvmYO5sZsCEmVFbjqcoAApDB9CEgKFxrAYGTAY4nStvfeHvowau1+sdTwVmoAZSUJKoZ27SBHvXH293Z2xRDwviCpQL+0JnDqZzRnsBzrBUD7nMSfQ5PA+Sfn2A70EOI7bvEygAX4sG4FAahQAAZHuB5HpUHw1sAyQEES6TIdkqGZOwADk2B4FgGIAIw2pYEDWjwfAcQQHFNIIHEoGouTiEAA

type FlatKeys<T extends Record<string, unknown>, K = keyof T> =
    K extends string ?
    T[K] extends Function | symbol ?
    never
    : T[K] extends Array<unknown> ?
    ArrayItemType<T[K]> extends Record<string, unknown> ? `${K}[${number}].${FlatKeys<ArrayItemType<T[K]>>}` : `${K}[${number}]`
    : T[K] extends Record<string, unknown> ? `${K}.${FlatKeys<T[K]>}` : K
    : never;

export type FormValuesDefaultType = Record<string, unknown>;
export type InputEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; changedField: string; }>) => void;
export type ChangeEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; changedField: string; }>) => void;
export type SubmitEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestStartEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestEndEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestSuccessEventHandler<FormValuesType, ResponseType> = (e: CustomEvent<{ values: FormValuesType; response: ResponseType; status: number; }>) => void;
export type RequestErrorEventHandler<FormValuesType, ResponseType> = (e: CustomEvent<{ values: FormValuesType; response: ResponseType; status: number; error?: Error; }>) => void;
export type ValidationHandler<FormValuesType extends Record<string, unknown>> = (param: { values: FormValuesType; }) => {
    [K in FlatKeys<FormValuesType>]?: string;
} | undefined;
export type SubmitTransform<FormValuesType, RequestType = FormValuesType> = (param: { values: FormValuesType; }) => RequestType;

export interface HTMLInformEl extends HTMLElement {
    requestSubmit: () => void;
};

export type InformElProps<FormValuesType extends Record<string, unknown> = FormValuesDefaultType, ResponseType = any, RequestType = FormValuesType> = React.PropsWithRef<{
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    errorDisableSubmit?: boolean;
    defaultSubmit?: boolean;
    resetOnSubmit?: boolean;
    ref?: React.Ref<HTMLInformEl>;
    zodSchema?: ZodType;
    onInformelReady?: (e: CustomEvent<undefined>) => void;
    onInformInput?: InputEventHandler<FormValuesType>;
    onInformChange?: ChangeEventHandler<FormValuesType>;
    onInformSubmit?: SubmitEventHandler<FormValuesType>;
    onRequestStart?: RequestStartEventHandler<FormValuesType>;
    onRequestEnd?: RequestEndEventHandler<FormValuesType>;
    onRequestSuccess?: RequestSuccessEventHandler<FormValuesType, ResponseType>;
    onRequestError?: RequestErrorEventHandler<FormValuesType, ResponseType>;
    validationHandler?: ValidationHandler<FormValuesType>;
    submitTransform?: SubmitTransform<FormValuesType, RequestType>;
    initialValues?: FormValuesType;
}>;

export declare function InformEl<FormValuesType = FormValuesDefaultType, ResponseType = any, RequestType = FormValuesType>(props: InformElProps<FormValuesType, ResponseType, RequestType>): React.ReactElement;

export type InformFieldProps = React.PropsWithRef<{
    children?: ReactNode;
    className?: string;
    style?: React.CSSProperties;
    defaultError?: string;
    badInput?: string;
    patternMismatch?: string;
    rangeOverflow?: string;
    rangeUnderflow?: string;
    stepMismatch?: string;
    tooLong?: string;
    tooShort?: string;
    typeMismatch?: string;
    valueMissing?: string;
    submitOnChange?: boolean;
    name?: string;
    ref?: React.Ref<HTMLElement>;
}>;

export declare function InformField(props: InformFieldProps): React.ReactElement;
