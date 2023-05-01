import { ZodType } from 'zod';

type ArrayItemType<T, K = unknown> = T extends Array<infer K> ? K : never;

type FlatKeys<T extends Record<string, unknown>, K = keyof T> =
    K extends string ?
    T[K] extends Function | symbol ?
    never
    : T[K] extends Array<unknown> ?
    ArrayItemType<T[K]> extends Record<string, unknown> ? `${K}[${number}].${FlatKeys<ArrayItemType<T[K]>>}` : `${K}[${number}]`
    : T[K] extends Record<string, unknown> ? `${K}.${FlatKeys<T[K]>}` : K
    : never;

export type FormValuesDefaultType = Record<string, unknown>;
export type InputEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; changedField: keyof FormValuesType; }>) => void;
export type ChangeEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; changedField: keyof FormValuesType; }>) => void;
export type SubmitEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestStartEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestEndEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestSuccessEventHandler<FormValuesType, ResponseType> = (e: CustomEvent<{ values: FormValuesType; response: ResponseType; status: number; }>) => void;
export type RequestErrorEventHandler<FormValuesType, ResponseType> = (e: CustomEvent<{ values: FormValuesType; response: ResponseType; status: number; error?: Error; }>) => void;
export type ValidationHandler<FormValuesType extends Record<string, unknown>> = (param: { values: FormValuesType; }) => {
    [K in FlatKeys<FormValuesType>]?: string;
} | undefined;
export type SubmitTransform<FormValuesType, RequestType = FormValuesType> = (param: { values: FormValuesType; }) => RequestType;

export interface HTMLInformEl<FormValuesType extends Record<string, unknown> = FormValuesDefaultType, RequestType = FormValuesType> extends HTMLElement {
    requestSubmit: () => void;
    setValues: (values: Partial<FormValuesType>) => void;
    reset: (values?: Partial<FormValuesType>) => void;
    values: FormValuesType;
    dirty: boolean;
    invalid: boolean;
    submitting: boolean;
    validationHandler?: ValidationHandler<FormValuesType>;
    zodSchema?: ZodType;
    submitTransform?: SubmitTransform<FormValuesType, RequestType>;
}

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
