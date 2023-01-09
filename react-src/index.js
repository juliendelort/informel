import React from 'react';


const BaseInformEl = generateEl('inform-el', 'BaseInformEl', [
    'informel-ready',
    'inform-input',
    'inform-change',
    'inform-submit',
    'request-start',
    'request-end',
    'request-success',
    'request-error'
], ['validationHandler', 'zodSchema']);
export const InformField = generateEl('inform-field', 'InformField');

// InformEl with initialValues
export const InformEl = React.forwardRef(({ children, initialValues, onInformelReady, ...rest }, ref) => {
    const initialValuesSet = React.useRef(false);
    const [informelReady, setInformelReady] = React.useState(false);

    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);

    const handleInformelReady = (e) => {
        setInformelReady(true);

        if (onInformelReady) {
            onInformelReady(e);
        }
    };

    useLayoutEffectSSRSafe(() => {
        if (!initialValuesSet.current && initialValues && informelReady) {
            combinedRef.current.reset(initialValues);
            initialValuesSet.current = true;
        }
    }, [initialValues, informelReady]);

    return (<BaseInformEl {...rest} ref={combinedRef} onInformelReady={handleInformelReady}>
        {children}
    </BaseInformEl>
    );
});
InformEl.displayName = 'InformEl';


function generateEl(el, displayName, events = [], properties = []) {
    // Web components wrapper
    const Inner = React.forwardRef(function Wrapper({
        children = null,
        className = '',
        ...rest
    }, ref) {

        const Tag = el;

        // We use forwardRef but we also need to use that ref internally: https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
        const combinedRef = useCombinedRefs(ref);

        // Forwards the event to corresponding `onCamelCaseEventName` prop
        const handleEvent = useEvent((event, ...args) => {
            const reactEventName = toCamelCase(`on-${event}`);

            if (rest[reactEventName]) {
                rest[reactEventName](...args);
            }

        });

        useLayoutEffectSSRSafe(() => {
            const eventHandlersByName = events.reduce((acc, event) => ({
                ...acc,
                [event]: (...args) => handleEvent(event, ...args)
            }), {});

            // Add an event listener for each specified event
            events.forEach(event => {
                combinedRef?.current?.addEventListener(event, eventHandlersByName[event]);
            });

            return () => {
                // Remove the event listener for each specified event
                events.forEach(event => {
                    combinedRef?.current?.removeEventListener(event, eventHandlersByName[event]);
                });
            };
        }, []);

        useLayoutEffectSSRSafe(() => {
            // Forwarding functions as props
            Object.keys(rest).forEach(propName => {
                // If a prop is a function and is not in the list of events, we forward it as a prop
                if (typeof rest[propName] === 'function' || properties.includes(propName)) {
                    const eventName = toKebabCase(propName.replace(/^(on)/, ''));
                    if (!events.includes(eventName)) {
                        combinedRef.current[propName] = rest[propName];
                    }
                }
            });
        });

        // Remove undefined or null attributes
        const restDefined = Object.keys(rest).reduce((result, key) => {
            if (rest[key] !== null && rest[key] !== undefined && typeof rest[key] !== 'function' && (typeof rest[key] !== 'boolean' || rest[key])) {
                // Support both the camelCase and kebab-case version
                result[toKebabCase(key)] = rest[key];
                result[key] = rest[key];
            }
            return result;
        }, {});

        return (
            // For webcomponents, we need to use `class` instead of `className`
            <Tag ref={combinedRef} class={className} {...restDefined} >
                {children}
            </Tag >
        );
    });
    Inner.displayName = displayName || el;

    return Inner;
}


function toKebabCase(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}


// https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
function useCombinedRefs(...refs) {
    const targetRef = React.useRef();

    React.useEffect(() => {
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, refs);

    return targetRef;
};

const useEvent = (handler) => {
    const handlerRef = React.useRef(null);

    useLayoutEffectSSRSafe(() => {
        handlerRef.current = handler;
    });

    return React.useCallback((...args) => {
        const fn = handlerRef.current;
        return fn(...args);
    }, []);
};

// useLayoutEffect does't play well with NextJS SSR: https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
const useLayoutEffectSSRSafe = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
