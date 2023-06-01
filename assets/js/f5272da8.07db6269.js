"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[58],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>c});var i=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),m=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=m(e.components);return i.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},h=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),u=m(n),h=a,c=u["".concat(s,".").concat(h)]||u[h]||d[h]||r;return n?i.createElement(c,l(l({ref:t},p),{},{components:n})):i.createElement(c,l({ref:t},p))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=h;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:a,l[1]=o;for(var m=2;m<r;m++)l[m]=n[m];return i.createElement.apply(null,l)}return i.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8680:(e,t,n)=>{n.d(t,{ZP:()=>o});var i=n(7462),a=(n(7294),n(3905));const r={toc:[]},l="wrapper";function o(e){let{components:t,...n}=e;return(0,a.kt)(l,(0,i.Z)({},r,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("iframe",{width:"100%",height:"800",src:"//jsfiddle.net/juliendelort/rwz9gxu2/117/embedded/result,html,js,css"}))}o.isMDXComponent=!0},6479:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>o,default:()=>d,frontMatter:()=>l,metadata:()=>s,toc:()=>m});var i=n(7462),a=(n(7294),n(3905)),r=n(8680);const l={sidebar_position:6,hide_title:!0,custom_edit_url:null,title:"Submitting"},o=void 0,s={unversionedId:"submitting",id:"submitting",title:"Submitting",description:"informel relies on the `` being submitted. This happens when:",source:"@site/docs/submitting.mdx",sourceDirName:".",slug:"/submitting",permalink:"/submitting",editUrl:null,tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6,hide_title:!0,custom_edit_url:null,title:"Submitting"},sidebar:"tutorialSidebar",previous:{title:"Listening for changes",permalink:"/listening-for-changes"},next:{title:"Dirty Check",permalink:"/dirty-check"}},m=[{value:"<code>inform-submit</code> event",id:"inform-submit-event",children:[],level:2},{value:"Sending AJAX request on submit",id:"sending-ajax-request-on-submit",children:[],level:2},{value:"Sending files",id:"sending-files",children:[],level:2},{value:"Transforming form values before submitting",id:"transforming-form-values-before-submitting",children:[],level:2},{value:"Restting the form after submission",id:"restting-the-form-after-submission",children:[],level:2},{value:"submit-on-change",id:"submit-on-change",children:[],level:2}],p={toc:m},u="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,i.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"submitting"},"Submitting"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"informel")," relies on the ",(0,a.kt)("inlineCode",{parentName:"p"},"<form />")," being submitted. This happens when:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Clicking on the submit button (",(0,a.kt)("inlineCode",{parentName:"li"},'<button type="submit"></button>')," or ",(0,a.kt)("inlineCode",{parentName:"li"},'<input type="submit" />'),")."),(0,a.kt)("li",{parentName:"ul"},"Calling ",(0,a.kt)("inlineCode",{parentName:"li"},"informel.requestSubmit()")),(0,a.kt)("li",{parentName:"ul"},"Calling ",(0,a.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit"},"form.requestSubmit()"))),(0,a.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"form.submit()")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},"Calling ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit"},"form.submit()")," would also submit the form, but it would bypass all the checks performed by ",(0,a.kt)("inlineCode",{parentName:"p"},"informel"),"."))),(0,a.kt)("p",null,"The submission stops if some fields are in error."),(0,a.kt)("p",null,'All fields become "touched" when attempting to submit the form and errors are displayed.'),(0,a.kt)("h2",{id:"inform-submit-event"},(0,a.kt)("inlineCode",{parentName:"h2"},"inform-submit")," event"),(0,a.kt)("p",null,"When the form is valid and the form is submitted, the ",(0,a.kt)("inlineCode",{parentName:"p"},"inform-submit")," event is triggered and the form values are passed in the ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail"},"event detail field")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"document.querySelector('inform-el').addEventListener('inform-submit', ({ detail: { values, submitter } }) => {\n    console.log('Successfully submitted!', values, submitter);\n});\n")),(0,a.kt)("p",null,"The event ",(0,a.kt)("inlineCode",{parentName:"p"},"detail")," field also contains a ",(0,a.kt)("inlineCode",{parentName:"p"},"submitter")," field which is the element that triggered the submission (or ",(0,a.kt)("inlineCode",{parentName:"p"},"null")," if the submission was triggered through ",(0,a.kt)("inlineCode",{parentName:"p"},"requestSubmit()"),");"),(0,a.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),(0,a.kt)("inlineCode",{parentName:"h5"},"submitter")," support")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"},(0,a.kt)("p",{parentName:"div"},(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/submitter"},"submitter")," is not supported in Safari < 15.4 and will be null in that case."))),(0,a.kt)("p",null,"This can be helpful for forms with multiple submit buttons:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<inform-el>\n    <form>\n        <inform-field>\n            <input type="text" name="firstName" required />\n        </inform-field>\n        <button type="submit" name="a">Submit & do A</button>\n        <button type="submit" name="b">Submit & do B</button>\n    </form>\n</inform-el>\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"document.querySelector('inform-el').addEventListener('inform-submit', ({ detail: { values, submitter } }) => {\n    if (submitter?.name === 'a') {\n        console.log('Submitted with A');\n    } else if (submitter?.name === 'b') {\n        console.log('Submitted with B');\n    }\n});\n")),(0,a.kt)("h2",{id:"sending-ajax-request-on-submit"},"Sending AJAX request on submit"),(0,a.kt)("p",null,"If the ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-action"},"action")," and ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#attr-method"},"method")," attributes are specified\non the form, ",(0,a.kt)("inlineCode",{parentName:"p"},"informel")," will automatically send the corresponding AJAX request on submit."),(0,a.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,a.kt)("div",{parentName:"div",className:"admonition-heading"},(0,a.kt)("h5",{parentName:"div"},(0,a.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,a.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,a.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),(0,a.kt)("inlineCode",{parentName:"h5"},"action")," and ",(0,a.kt)("inlineCode",{parentName:"h5"},"method")," are ",(0,a.kt)("inlineCode",{parentName:"h5"},"<form/>")," attributes, not ",(0,a.kt)("inlineCode",{parentName:"h5"},"<inform-el />")," attributes!")),(0,a.kt)("div",{parentName:"div",className:"admonition-content"})),(0,a.kt)("p",null,"See the example below:"),(0,a.kt)(r.ZP,{mdxType:"JokesExample"}),(0,a.kt)("p",null,"Different events are emitted along the way:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"request-start"),": The AJAX request has started. ",(0,a.kt)("inlineCode",{parentName:"li"},"detail")," contains the following fields:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"values"),": the form values."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"request-success"),": The AJAX request has succeeded (status 2XX). ",(0,a.kt)("inlineCode",{parentName:"li"},"detail")," contains the following fields:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"values"),": the form values."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"response"),": the json response."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"status"),": the http status."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"request-error"),": The AJAX request has returned an error (status != 2XX) or there was an exception. ",(0,a.kt)("inlineCode",{parentName:"li"},"detail")," contains the following fields:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"values"),": the form values."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"response"),": the json response."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"status"),": the http status"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"error"),": if there was an exception, the error."))),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"request-end"),": The AJAX request has end, regardless of the result. ",(0,a.kt)("inlineCode",{parentName:"li"},"detail")," contains the following fields:",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"values"),": the form values.")))),(0,a.kt)("h2",{id:"sending-files"},"Sending files"),(0,a.kt)("p",null,"If any of the field is of type ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/File/File"},"File"),", the is sent with header ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type"},"Content-Type")," ",(0,a.kt)("inlineCode",{parentName:"p"},"multipart/form-data"),".\nOtherwise, the data is sent with header ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type"},"Content-Type")," ",(0,a.kt)("inlineCode",{parentName:"p"},"application/json"),"."),(0,a.kt)("h2",{id:"transforming-form-values-before-submitting"},"Transforming form values before submitting"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"<inform-el>")," has a ",(0,a.kt)("inlineCode",{parentName:"p"},"submitTransform()")," method called before submission, if implemented."),(0,a.kt)("p",null,"It receives the form values as parameter and must returns the parameters to send, as an object."),(0,a.kt)("p",null,"Example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"document.querySelector('inform-el').submitTransform = (values) => ({\n    ...values,\n    fullName: values.firstName + ' ' + values.lastName,\n});\n")),(0,a.kt)("h2",{id:"restting-the-form-after-submission"},"Restting the form after submission"),(0,a.kt)("p",null,"It is possible to automatically reset the form after submission by using the ",(0,a.kt)("inlineCode",{parentName:"p"},"reset-on-submit")," attribute:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},"<inform-el reset-on-submit> ... </inform-el>\n")),(0,a.kt)("h2",{id:"submit-on-change"},"submit-on-change"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"<inform-field />")," supports ",(0,a.kt)("inlineCode",{parentName:"p"},"submit-on-change")," field which will trigger form submission whenever the field has\nchanged (received the ",(0,a.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event"},"change event"),")."),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-html"},'<inform-el>\n    <form action={`https://todo.test/api/task/${task.id}`} method="post">\n        <inform-field submit-on-change>\n            <input type="checkbox" name="done" />\n        </inform-field>\n    </form>\n</inform-el>\n')),(0,a.kt)("p",null,"The above sents a POST request to ",(0,a.kt)("inlineCode",{parentName:"p"},"https://todo.test/api/task/${task.id}")," with body params ",(0,a.kt)("inlineCode",{parentName:"p"},"{done: true|false}")," when\nthe checkbox is toggled."))}d.isMDXComponent=!0}}]);