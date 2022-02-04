import InformEl from './inform-el.svelte';
import InformField from './inform-field.svelte';
import component from 'svelte-tag';


new component({ component: InformEl, tagname: 'inform-el', shadow: false, attributes: ['error-disable-submit'], methods: ['setValidationHandler'] });
new component({ component: InformField, tagname: 'inform-field', shadow: false, attributes: [] });
