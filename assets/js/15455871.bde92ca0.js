"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[194],{3905:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return c}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},d=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),p=u(r),c=i,f=p["".concat(s,".").concat(c)]||p[c]||m[c]||a;return r?n.createElement(f,l(l({ref:t},d),{},{components:r})):n.createElement(f,l({ref:t},d))}));function c(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var u=2;u<a;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},9166:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return o},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return d},default:function(){return p}});var n=r(7462),i=r(3366),a=(r(7294),r(3905)),l=["components"],o={sidebar_position:2,hide_title:!0,custom_edit_url:null,title:"Validation rules & error messages"},s="Validation rules & error messages",u={unversionedId:"validation-rules",id:"validation-rules",title:"Validation rules & error messages",description:"Custom validation rules",source:"@site/docs/validation-rules.mdx",sourceDirName:".",slug:"/validation-rules",permalink:"/informel/validation-rules",editUrl:null,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,hide_title:!0,custom_edit_url:null,title:"Validation rules & error messages"},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/informel/"},next:{title:"Showing validation errors",permalink:"/informel/showing-errors"}},d=[{value:"Custom validation rules",id:"custom-validation-rules",children:[],level:2},{value:"Custom error message",id:"custom-error-message",children:[],level:2},{value:"Using zod for validation",id:"using-zod-for-validation",children:[],level:2},{value:"Disabling the submit button on error",id:"disabling-the-submit-button-on-error",children:[],level:2}],m={toc:d};function p(e){var t=e.components,r=(0,i.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"validation-rules--error-messages"},"Validation rules & error messages"),(0,a.kt)("h2",{id:"custom-validation-rules"},"Custom validation rules"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"informel")," uses ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation#using_built-in_form_validation"},"the browser built-in form validation")," by default, with attributes such as ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required"},"required"),", ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/minlength"},"minlength"),", ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern"},"pattern"),", ",(0,a.kt)("inlineCode",{parentName:"p"},'type="email"'),", ",(0,a.kt)("inlineCode",{parentName:"p"},'type="url"')," etc..."),(0,a.kt)("p",null,"Here is an example (try submitting the form):"),(0,a.kt)("iframe",{width:"100%",height:"500",src:"//jsfiddle.net/juliendelort/w78zmyrs/25/embedded/result,html",allowfullscreen:"allowfullscreen",allowpaymentrequest:!0,frameborder:"0"}),(0,a.kt)("br",null),(0,a.kt)("br",null),"On top of that, it is possible to specify custom validation rules, via the `validationHandler` property:",(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"document.querySelector('inform-el').validationHandler = ({ values }) => {\n    // Returns an object {'field name': 'error message'}\n};\n")),(0,a.kt)("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/juliendelort/cs9uqpt3/12/embedded/result,html,js",allowfullscreen:"allowfullscreen",allowpaymentrequest:!0,frameborder:"0"}),(0,a.kt)("h2",{id:"custom-error-message"},"Custom error message"),(0,a.kt)("p",null,"When a field is in error, the control's ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage"},"validationMessage")," is shown by default."),(0,a.kt)("p",null,"For example, on Google Chrome, ",(0,a.kt)("inlineCode",{parentName:"p"},'<input type="text" required />')," will show ",(0,a.kt)("inlineCode",{parentName:"p"},"Please fill out this field.")," while ",(0,a.kt)("inlineCode",{parentName:"p"},'<input type="checkbox" required />')," will show ",(0,a.kt)("inlineCode",{parentName:"p"},"Please check this box if you want to proceed."),"."),(0,a.kt)("p",null,"To customize this behavior, you can either use ",(0,a.kt)("a",{parentName:"p",href:"validation-rules#custom-validation-rules"},"validationHandler as shown above"),", or use the following attributes on ",(0,a.kt)("inlineCode",{parentName:"p"},"<inform-field />"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"default-error"),": a fixed error message displayed whenever the field is in error (regardless of the reason)."),(0,a.kt)("li",{parentName:"ul"},"For each property in the ",(0,a.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState"},"native ValidityState object"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"<inform-field />")," accepts a corresponding kebab-case attribute to specify the error message.\nFor example, if the field is ",(0,a.kt)("inlineCode",{parentName:"li"},'<input type="email" required />')," and you want to show different errors when the value is not set or when the value doesn't have the right format,\nyou can use the ",(0,a.kt)("inlineCode",{parentName:"li"},"value-missing")," and the ",(0,a.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/typeMismatch"},(0,a.kt)("inlineCode",{parentName:"a"},"type-mismatch"))," attributes. See them in action here:")),(0,a.kt)("iframe",{width:"100%",height:"500",src:"//jsfiddle.net/juliendelort/zngptexb/8/embedded/html,result/",allowfullscreen:"allowfullscreen",allowpaymentrequest:!0,frameborder:"0"}),(0,a.kt)("p",null,"When multiple errors are specified, the order of precedence is:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Error returned by validationHandler"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"<inform-field />")," ValidityState attribute"),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("inlineCode",{parentName:"li"},"<inform-field />"),' "default-error" attribute'),(0,a.kt)("li",{parentName:"ol"},"The element native ",(0,a.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage"},"validationMessage"),".")),(0,a.kt)("h2",{id:"using-zod-for-validation"},"Using zod for validation"),(0,a.kt)("p",null,"A ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/colinhacks/zod"},"zod")," schema can be specified via the ",(0,a.kt)("inlineCode",{parentName:"p"},"zodSchema")," property:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'document.querySelector(\'inform-el\').zodSchema = z.object({\n    first_name: z.string().min(1, { message: "Firstname is required" }),\n    last_name: z.string().min(1, { message: "Lastname is required" }),\n    email: z.string().min(1, { message: "Email is required" }).email({\n        message: "Must be a valid email",\n    }),\n    password: z\n        .string()\n        .min(6, { message: "Password must be atleast 6 characters" }),\n    terms: z.literal(true, {\n        errorMap: () => ({ message: "You must accept Terms and Conditions" }),\n    }),\n});\n')),(0,a.kt)("p",null,"Just like other validation methods, if the form values are incompatible with the schema, errors are shown and submission is blocked."),(0,a.kt)("h2",{id:"disabling-the-submit-button-on-error"},"Disabling the submit button on error"),(0,a.kt)("p",null,"When adding the ",(0,a.kt)("inlineCode",{parentName:"p"},"error-disable-submit")," attribute on ",(0,a.kt)("inlineCode",{parentName:"p"},"<inform-el />"),", the submit button is automatically disabled while errors are shown:"),(0,a.kt)("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/juliendelort/af3xg54h/1/embedded/result,html/",allowfullscreen:"allowfullscreen",allowpaymentrequest:!0,frameborder:"0"}))}p.isMDXComponent=!0}}]);