import React from 'react';


export const InformEl = generateEl('inform-el', 'InformEl');
export const InformField = generateEl('inform-field', 'InformField');


function generateEl(el, displayName) {
    // Web components wrapper
    const Inner = React.forwardRef(function Wrapper({
        children = null,
        className = '',
        ...rest
    }, ref) {

        const Tag = el;

        // We use forwardRef but we also need to use that ref internally: https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
        const innerRef = React.useRef(null);
        const combinedRef = useCombinedRefs(ref, innerRef);

        const eventsRef = React.useRef({});
        const handlers = React.useRef({});

        // We want this at every render
        React.useEffect(() => {
            // We don't want to re-attach listeners at every render but we also don't want stale event listeners
            // So we attach a generic event listener and we use a ref to call the up-to-date listener
            const mainEventListener = (eventName) => (...args) => {
                eventsRef.current[eventName](...args);
            };

            // Finding events: all props that have a function as value
            // and transforming their name "onEventName" => "event-name"
            const [events, properties] = Object.keys(rest).reduce(([events, properties], current) => {
                if (typeof rest[current] === 'function') {

                    if (current.startsWith('on')) { // events start witn "on"
                        // Remove "on" at the beginning and convert to kebab case
                        // onSearchKeystroke => search-keystroke
                        events[toKebabCase(current.replace(/^(on)/, ''))] = rest[current];
                    } else {
                        // property otherwise
                        properties[current] = rest[current];
                    }
                }

                return [events, properties];
            }, [{}, {}]);


            // Look for new events
            for (let eventName in events) {
                if (!eventsRef.current[eventName]) {
                    // new event
                    handlers.current[eventName] = mainEventListener(eventName);
                    combinedRef.current?.addEventListener(eventName, handlers.current[eventName]);
                }
            }

            // Look for removed events
            for (let eventName in handlers.current) {
                if (!events[eventName]) {
                    combinedRef.current?.removeEventListener(eventName, handlers.current[eventName]);
                    delete handlers.current[eventName];
                }
            }

            if (combinedRef.current) {
                // Add properties
                for (let propName in properties) {

                    combinedRef.current[propName] = properties[propName];
                }
            }

            eventsRef.current = events;
        });


        React.useEffect(() => {
            // When component is unmounted : remove all events
            return () => {
                for (let eventName in handlers.current) {
                    combinedRef.current?.removeEventListener(eventName, handlers.current[eventName]);

                }
            };
        }, []);

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
    }, [refs]);

    return targetRef;
}
