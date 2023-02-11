"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[52],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return u}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),p=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,s=e.parentName,m=o(e,["components","mdxType","originalType","parentName"]),d=p(n),u=i,f=d["".concat(s,".").concat(u)]||d[u]||c[u]||r;return n?a.createElement(f,l(l({ref:t},m),{},{components:n})):a.createElement(f,l({ref:t},m))}));function u(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,l=new Array(r);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},6495:function(e,t,n){n.d(t,{ZP:function(){return s}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),l=["components"],o={toc:[]};function s(e){var t=e.components,n=(0,i.Z)(e,l);return(0,r.kt)("wrapper",(0,a.Z)({},o,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("iframe",{width:"100%",height:"800",src:"https://stackblitz.com/edit/react-ts-2b1jgw?embed=1&file=index.tsx"}))}s.isMDXComponent=!0},5940:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return p},metadata:function(){return m},toc:function(){return c},default:function(){return u}});var a=n(7462),i=n(3366),r=(n(7294),n(3905)),l=n(6495),o=["components"],s={sidebar_position:10,hide_title:!0,custom_edit_url:null,title:"Usage in React"},p="Usage in React",m={unversionedId:"react",id:"react",title:"Usage in React",description:"Using Web Components in React is not always easy, especially when it comes to handling events.",source:"@site/docs/react.mdx",sourceDirName:".",slug:"/react",permalink:"/informel/react",editUrl:null,tags:[],version:"current",sidebarPosition:10,frontMatter:{sidebar_position:10,hide_title:!0,custom_edit_url:null,title:"Usage in React"},sidebar:"tutorialSidebar",previous:{title:"API",permalink:"/informel/api"},next:{title:"Examples",permalink:"/informel/examples"}},c=[{value:"Typescript",id:"typescript",children:[],level:2},{value:"Setting initial values",id:"setting-initial-values",children:[],level:2},{value:"Usage in Next.js",id:"usage-in-nextjs",children:[],level:2},{value:"Examples",id:"examples",children:[],level:2}],d={toc:c};function u(e){var t=e.components,n=(0,i.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"usage-in-react"},"Usage in React"),(0,r.kt)("p",null,"Using Web Components in React ",(0,r.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/web-components.html#using-web-components-in-react"},"is not always easy"),", especially when it comes to handling events."),(0,r.kt)("p",null,"To facilitate things, ",(0,r.kt)("inlineCode",{parentName:"p"},"informel")," exports React components wrappers for its Web Components:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"<InformEl />")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"<InformField />"))),(0,r.kt)("p",null,"They can be imported like so:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"import { InformEl, InformField } from 'informel/react';\n")),(0,r.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"Imports")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"The imports above don't replace ",(0,r.kt)("inlineCode",{parentName:"p"},"import 'informel';"),", that still needs to be done at the root of your app (in App.js for example)"))),(0,r.kt)("p",null,"The API and behavior are the same as using the Web Components (",(0,r.kt)("inlineCode",{parentName:"p"},"<inform-el/>")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"<inform-field />"),") directly.\nEvents and access to ",(0,r.kt)("inlineCode",{parentName:"p"},"validityHandler"),", ",(0,r.kt)("inlineCode",{parentName:"p"},"submitTransform")," and events are facilitated:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"<InformEl\n    onInformInput={handleInput}\n    onInformSubmit={handleSubmit}\n    validationHandler={handleValidation}\n    zodSchema={ZodSchema}\n    onInformelReady={() => {\n        console.log('ready!!!!');\n    }}\n    submitTransform={handleSubmitTransform}\n    onRequestStart={(e) => console.log('request start', e.detail)}\n    onRequestSuccess={(e) => console.log('request success', e.detail)}\n    onRequestError={(e) => console.log('request error', e.detail)}\n>\n    ...\n</InformEl>\n")),(0,r.kt)("p",null,'All the events described in the API are available as prop using their camelCase version, prefixed by "on":'),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"inform-input")," becomes ",(0,r.kt)("inlineCode",{parentName:"li"},"onInformInput")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"informel-ready")," becomes ",(0,r.kt)("inlineCode",{parentName:"li"},"onInformelReady")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"request-start")," becomes ",(0,r.kt)("inlineCode",{parentName:"li"},"onRequestStart")," etc...")),(0,r.kt)("p",null,"All the attributes have a camelCase equivalent (see in the example below, ",(0,r.kt)("inlineCode",{parentName:"p"},"too-short")," becomes ",(0,r.kt)("inlineCode",{parentName:"p"},"tooShort"),"):"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<InformField tooShort="At least 8 characters!">\n    <input type="password" name="password" required minLength={8} />\n</InformField>\n')),(0,r.kt)("p",null,"Typescript definitions can be found ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/juliendelort/informel/blob/main/react-src/index.d.ts"},"here"),"."),(0,r.kt)("p",null,"Methods (",(0,r.kt)("inlineCode",{parentName:"p"},"setValues")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"reset"),") can be called using a ",(0,r.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/refs-and-the-dom.html"},"ref"),":"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"const ref = React.createRef();\n")),(0,r.kt)("p",null,"and then:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<InformEl ref={ref}>\n    <form>\n        <label>\n            Email\n            <InformField>\n                <input type="email" name="email" required />\n            </InformField>\n        </label>\n    </form>\n\n    <button onClick={() => ref.current.setValues({ email: \'bonjour\' })}>Bonjour</button>\n</InformEl>\n')),(0,r.kt)("h2",{id:"typescript"},"Typescript"),(0,r.kt)("p",null,"The library is fully typed. Type definitions are exported from ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/juliendelort/informel/blob/main/react-src/index.d.ts"},"here"),"."),(0,r.kt)("h2",{id:"setting-initial-values"},"Setting initial values"),(0,r.kt)("p",null,"An extra prop ",(0,r.kt)("inlineCode",{parentName:"p"},"initialValues")," is available in React. It allows to set the form initial values. The first time this prop is assigned an object, the form is reset\nto the values inside that object (matched by ",(0,r.kt)("inlineCode",{parentName:"p"},"name")," attribute on each field)."),(0,r.kt)("p",null,"Example:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'<InformEl initialValues={{ email: \'test@test.com\' }}>\n    <form>\n        <label>\n            Email\n            <InformField>\n                <input type="email" name="email" required />\n            </InformField>\n        </label>\n    </form>\n</InformEl>\n')),(0,r.kt)("p",null,"The example below fetches data and uses the result as form default values:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},'const [formInitialValues, setFormInitialValues] = useState();\n\nReact.useEffect(()=>{\n    const init = async ()=>{\n        // ...fetch some data\n\n        setFormInitialValues(receivedData);\n    }\n    init();\n}, [])\n\n<InformEl initialValues={formInitialValues}>\n    <form>\n        <label>\n            Email\n            <InformField>\n                <input type="email" name="email" required />\n            </InformField>\n        </label>\n    </form>\n</InformEl>\n')),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Only the first value is used")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"After the initial values are set once, any change to the ",(0,r.kt)("inlineCode",{parentName:"p"},"initialValues")," prop will be ignored."))),(0,r.kt)("h2",{id:"usage-in-nextjs"},"Usage in Next.js"),(0,r.kt)("p",null,"Next.js renders on the server side (SSR) and that is not compatible with Web Components.\nA workaround is to call ",(0,r.kt)("inlineCode",{parentName:"p"},"import()")," in a ",(0,r.kt)("inlineCode",{parentName:"p"},"useEffect()")," in order to dynamically add the Web Components definition\nto the page, on the front end:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-jsx"},"React.useEffect(() => {\n    import('informel');\n}, []);\n")),(0,r.kt)("p",null,"Source: ",(0,r.kt)("a",{parentName:"p",href:"https://dev.to/swyx/how-to-use-web-components-with-next-js-and-typescript-4gg1"},"https://dev.to/swyx/how-to-use-web-components-with-next-js-and-typescript-4gg1")),(0,r.kt)("h2",{id:"examples"},"Examples"),(0,r.kt)("p",null,"Here is a simple example:"),(0,r.kt)("iframe",{width:"100%",height:"800",src:"https://stackblitz.com/edit/react-ts-6k1p9j?embed=1&file=index.tsx"}),(0,r.kt)("p",null,"Here is another example showing the usage of the ",(0,r.kt)("inlineCode",{parentName:"p"},"action")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"method")," attributes, with optimistic updates:"),(0,r.kt)(l.ZP,{mdxType:"TodoExample"}),(0,r.kt)("p",null,"In the example above there are 3 ",(0,r.kt)("inlineCode",{parentName:"p"},"informel")," forms:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"One for adding a task at the top"),(0,r.kt)("li",{parentName:"ul"},"One wrapping the done checkbox and using ",(0,r.kt)("inlineCode",{parentName:"li"},"submit-on-change"),". It sends a PUT request to set the task to done."),(0,r.kt)("li",{parentName:"ul"},"One wrapping the delete button (the delete button is the submit button). It sends a DELETE request.")))}u.isMDXComponent=!0}}]);