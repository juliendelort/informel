export type FormValuesDefaultType = Record<string, any>;
export type InputEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; changedField: string; }>) => void;
export type ChangeEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; changedField: string; }>) => void;
export type SubmitEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestStartEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestEndEventHandler<FormValuesType> = (e: CustomEvent<{ values: FormValuesType; }>) => void;
export type RequestSuccessEventHandler<FormValuesType, ResponseType> = (e: CustomEvent<{ values: FormValuesType; response: ResponseType; status: number; }>) => void;
export type RequestErrorEventHandler<FormValuesType, ResponseType> = (e: CustomEvent<{ values: FormValuesType; response: ResponseType; status: number; error?: Error; }>) => void;
export type ValidationHandler<FormValuesType> = (param: { values: FormValuesType; }) => { [f in keyof FormValuesType]?: string; };
export type SubmitTransform<FormValuesType, RequestType = FormValuesType> = (param: { values: FormValuesType; }) => RequestType;

export type InformElProps<FormValuesType, ResponseType, RequestType> = React.PropsWithChildren<{
    className?: string;
    ["error-disable-submit"]?: boolean;
    ["reset-on-submit"]?: boolean;
    onInformelReady?: VoidFunction;
    onInput?: InputEventHandler<FormValuesType>;
    onChange?: InputEventHandler<FormValuesType>;
    onSubmit?: InputEventHandler<FormValuesType>;
    onRequestStart?: RequestStartEventHandler<FormValuesType>;
    onRequestEnd?: RequestEndEventHandler<FormValuesType>;
    onRequestSuccess?: RequestSuccessEventHandler<FormValuesType, ResponseType>;
    onRequestError?: RequestErrorEventHandler<FormValuesType, ResponseType>;
    validationHandler?: ValidationHandler<FormValuesType>;
    submitTransform?: SubmitTransform<FormValuesType, RequestType>;
}>;

export type InformElComponent = <FormValuesType = FormValuesDefaultType, ResponseType = any, RequestType = FormValuesType>(props: InformElProps<FormValuesType, ResponseType, RequestType>) => ReturnType<React.FC>;

export const InformEl: InformElComponent;

export const InformField: React.FC<{
    ["submit-on-change"]?: boolean;
    className?: string;
}>;
