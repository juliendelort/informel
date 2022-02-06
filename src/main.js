import InformEl from './inform-el.svelte';
import InformField from './inform-field.svelte';
// import MyTest from './test.svelte';

// Adding support for kebab-case attributes
class InformElWrapper extends InformEl {
    static get observedAttributes() {
        return (super.observedAttributes || []).map(attr => attr.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase());
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.replace(/-([a-z])/g, (_, up) => up.toUpperCase());
        super.attributeChangedCallback(attrName, oldValue, newValue);
    }
}

customElements.define('inform-el', InformElWrapper);

class InformFieldWrapper extends InformField {
    static get observedAttributes() {
        return (super.observedAttributes || []).map(attr => attr.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase());
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.replace(/-([a-z])/g, (_, up) => up.toUpperCase());
        super.attributeChangedCallback(attrName, oldValue, newValue);
    }
}

customElements.define('inform-field', InformFieldWrapper);
