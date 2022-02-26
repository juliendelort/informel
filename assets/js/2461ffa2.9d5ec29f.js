"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[600],{3905:function(e,t,l){l.d(t,{Zo:function(){return u},kt:function(){return h}});var n=l(7294);function a(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}function r(e,t){var l=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),l.push.apply(l,n)}return l}function i(e){for(var t=1;t<arguments.length;t++){var l=null!=arguments[t]?arguments[t]:{};t%2?r(Object(l),!0).forEach((function(t){a(e,t,l[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(l)):r(Object(l)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(l,t))}))}return e}function o(e,t){if(null==e)return{};var l,n,a=function(e,t){if(null==e)return{};var l,n,a={},r=Object.keys(e);for(n=0;n<r.length;n++)l=r[n],t.indexOf(l)>=0||(a[l]=e[l]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)l=r[n],t.indexOf(l)>=0||Object.prototype.propertyIsEnumerable.call(e,l)&&(a[l]=e[l])}return a}var s=n.createContext({}),d=function(e){var t=n.useContext(s),l=t;return e&&(l="function"==typeof e?e(t):i(i({},t),e)),l},u=function(e){var t=d(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var l=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),m=d(l),h=a,c=m["".concat(s,".").concat(h)]||m[h]||p[h]||r;return l?n.createElement(c,i(i({ref:t},u),{},{components:l})):n.createElement(c,i({ref:t},u))}));function h(e,t){var l=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=l.length,i=new Array(r);i[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var d=2;d<r;d++)i[d]=l[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,l)}m.displayName="MDXCreateElement"},7975:function(e,t,l){l.r(t),l.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return u},default:function(){return m}});var n=l(7462),a=l(3366),r=(l(7294),l(3905)),i=["components"],o={sidebar_position:9,hide_title:!0,custom_edit_url:null,title:"API"},s="API",d={unversionedId:"api",id:"api",title:"API",description:"``",source:"@site/docs/api.mdx",sourceDirName:".",slug:"/api",permalink:"/informel/docs/api",editUrl:null,tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9,hide_title:!0,custom_edit_url:null,title:"API"},sidebar:"tutorialSidebar",previous:{title:"Resetting the form & setting values",permalink:"/informel/docs/resetting"},next:{title:"Usage in React",permalink:"/informel/docs/react"}},u=[{value:"<code>&lt;inform-el&gt;</code>",id:"inform-el",children:[{value:"Attributes",id:"attributes",children:[],level:3},{value:"Events",id:"events",children:[],level:3},{value:"Methods",id:"methods",children:[{value:"<code>reset(newValues?)</code>",id:"resetnewvalues",children:[],level:4},{value:"<code>setValues(newValues)</code>",id:"setvaluesnewvalues",children:[],level:4}],level:3},{value:"Properties",id:"properties",children:[{value:"<code>validationHandler</code>",id:"validationhandler",children:[],level:4},{value:"<code>submitTransform</code>",id:"submittransform",children:[],level:4}],level:3}],level:2},{value:"<code>&lt;inform-field&gt;</code>",id:"inform-field",children:[{value:"Attributes",id:"attributes-1",children:[],level:3}],level:2}],p={toc:u};function m(e){var t=e.components,l=(0,a.Z)(e,i);return(0,r.kt)("wrapper",(0,n.Z)({},p,l,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"api"},"API"),(0,r.kt)("h2",{id:"inform-el"},(0,r.kt)("inlineCode",{parentName:"h2"},"<inform-el>")),(0,r.kt)("h3",{id:"attributes"},"Attributes"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"error-disable-submit")," (boolean, true if present): Set this in order to automatically disable the submit button until the form is valid."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"reset-on-submit")," (boolean, true if present): Set this in order to automatically reset the form after submit.")),(0,r.kt)("p",null,"The attributes below are automatically set:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"submitting")," (boolean, true if present): Set while the form is sending an AJAX request (based on the ",(0,r.kt)("inlineCode",{parentName:"li"},"<form>")," ",(0,r.kt)("inlineCode",{parentName:"li"},"action")," and ",(0,r.kt)("inlineCode",{parentName:"li"},"method")," attributes). Can be used to show a loading state."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"invalid")," (boolean, true if present): Set while the form invalid."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"dirty")," (boolean, true if present): Set while the form dirty.")),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"action")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"method")," are native forms attribute but must be specified on the ",(0,r.kt)("inlineCode",{parentName:"p"},"<form>")," element, if applicable."),(0,r.kt)("h3",{id:"events"},"Events"),(0,r.kt)("table",null,(0,r.kt)("thead",null,(0,r.kt)("tr",null,(0,r.kt)("th",null,"event"),(0,r.kt)("th",null,"content of detail field"),(0,r.kt)("th",null,"description"))),(0,r.kt)("tbody",null,(0,r.kt)("tr",null,(0,r.kt)("td",null,"informel-ready"),(0,r.kt)("td",null,"none"),(0,r.kt)("td",null,"The component has been initialized and is ready to be used. Wait for this event before calling any method.")),(0,r.kt)("tr",null,(0,r.kt)("td",null,"input"),(0,r.kt)("td",null,(0,r.kt)("ul",null,(0,r.kt)("li",null,"values: the form values"),(0,r.kt)("li",null,"changedField: the name of the field that changed"))),(0,r.kt)("td",null,"See ",(0,r.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event"},"input event"))),(0,r.kt)("tr",null,(0,r.kt)("td",null,"change"),(0,r.kt)("td",null,(0,r.kt)("ul",null,(0,r.kt)("li",null,"values: the form values"),(0,r.kt)("li",null,"changedField: the name of the field that changed"))),(0,r.kt)("td",null,"See ",(0,r.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event"},"change event"))),(0,r.kt)("tr",null,(0,r.kt)("td",null,"submit"),(0,r.kt)("td",null,(0,r.kt)("ul",null,(0,r.kt)("li",null,"values: the form values"))),(0,r.kt)("td",null,"See ",(0,r.kt)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event"},"submit event"))),(0,r.kt)("tr",null,(0,r.kt)("td",null,"request-start"),(0,r.kt)("td",null,(0,r.kt)("ul",null,(0,r.kt)("li",null,"values: the form values"))),(0,r.kt)("td",null,"The form AJAX request (based on action and method form attributes) has started. Can be used to display a loading state.")),(0,r.kt)("tr",null,(0,r.kt)("td",null,"request-end"),(0,r.kt)("td",null,(0,r.kt)("ul",null,(0,r.kt)("li",null,"values: the form values"))),(0,r.kt)("td",null,"The form AJAX request (based on action and method form attributes) has ended. Can be used to hide the loading state.")),(0,r.kt)("tr",null,(0,r.kt)("td",null,"request-success"),(0,r.kt)("td",null,(0,r.kt)("ul",null,(0,r.kt)("li",null,"values: the form values"),(0,r.kt)("li",null,"response: the json response"),(0,r.kt)("li",null,"status: the http status"))),(0,r.kt)("td",null,"The form AJAX request has succeeded (status 2XX)")),(0,r.kt)("tr",null,(0,r.kt)("td",null,"request-error"),(0,r.kt)("td",null,(0,r.kt)("ul",null,(0,r.kt)("li",null,"values: the form values"),(0,r.kt)("li",null,"response: the json response"),(0,r.kt)("li",null,"status: the http status"),(0,r.kt)("li",null,"error: the exception if there was one"))),(0,r.kt)("td",null,"The form AJAX request has failed (status != 2XX) or there was an exception")))),(0,r.kt)("p",null,"All the native events also bubble up to ",(0,r.kt)("inlineCode",{parentName:"p"},"<inform-el>"),"."),(0,r.kt)("h3",{id:"methods"},"Methods"),(0,r.kt)("h4",{id:"resetnewvalues"},(0,r.kt)("inlineCode",{parentName:"h4"},"reset(newValues?)")),(0,r.kt)("p",null,"Resets the form. If ",(0,r.kt)("inlineCode",{parentName:"p"},"newValues")," is provided the form will be reset to the provided values.\nIf no ",(0,r.kt)("inlineCode",{parentName:"p"},"newValues")," are provided, the form will reset to the last reset value or to the initial values."),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"dirty")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"invalid")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"touched")," states are also reset."),(0,r.kt)("h4",{id:"setvaluesnewvalues"},(0,r.kt)("inlineCode",{parentName:"h4"},"setValues(newValues)")),(0,r.kt)("p",null,"Sets form values, without resetting."),(0,r.kt)("h3",{id:"properties"},"Properties"),(0,r.kt)("p",null,"The ",(0,r.kt)("inlineCode",{parentName:"p"},"submitting"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"dirty")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"invalid")," attributes mentioned above are also exposed as properties."),(0,r.kt)("h4",{id:"validationhandler"},(0,r.kt)("inlineCode",{parentName:"h4"},"validationHandler")),(0,r.kt)("p",null,"Function that receives the current form values and returns the errors in the format:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"{\n    fieldName: 'Error description';\n}\n")),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"document.querySelector('inform-el').validationHandler = ({ values }) => ({\n    password_repeat: values.password !== values.password_repeat ? 'Passwords must match!' : '',\n});\n")),(0,r.kt)("p",null,'The above will display the "Passwords must match!" error next to the ',(0,r.kt)("inlineCode",{parentName:"p"},"password_repeat")," field if it's not\nidentical to the ",(0,r.kt)("inlineCode",{parentName:"p"},"password")," field."),(0,r.kt)("h4",{id:"submittransform"},(0,r.kt)("inlineCode",{parentName:"h4"},"submitTransform")),(0,r.kt)("p",null,"Function called before submit. It receives the form values and returns the transformed\ndata to send to the backend."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"document.querySelector('inform-el').submitTransform = (values) => ({\n    ...values,\n    fullName: values.firstName + ' ' + values.lastName,\n});\n")),(0,r.kt)("h2",{id:"inform-field"},(0,r.kt)("inlineCode",{parentName:"h2"},"<inform-field>")),(0,r.kt)("h3",{id:"attributes-1"},"Attributes"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"submit-on-change")," (boolean, true if present): If present, the form will be submitted whenever this field has changed (as part the ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event"},"change event"),")"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"default-error")," (string): Error message to display when this field is in error, regardless of the error."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"bad-input")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput"},"badInput"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"pattern-mismatch")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/patternMismatch"},"patternMismatch"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"range-overflow")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeOverflow"},"rangeOverflow"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"range-underflow")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/rangeUnderflow"},"rangeUnderflow"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"step-mismatch")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/stepMismatch"},"stepMismatch"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"too-long")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooLong"},"tooLong"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"too-short")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/tooShort"},"tooShort"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"type-mismatch")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch"},"typeMismatch"),"."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"value-missing")," (string): Error message to display when this field ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"ValidityState")," is ",(0,r.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/valueMissing"},"valueMissing"),".")),(0,r.kt)("p",null,"The attributes below are automatically set:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"touched"),' (boolean, true if present): If present, this field has been "touched" (blurred at least once), or a submission attempt has been made.'),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"error")," (boolean, true if present): If present, this field is invalid and the error is displayed (error is only displayed when the field has been touched).")))}m.isMDXComponent=!0}}]);