"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[538],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),m=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=m(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},c=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=m(n),u=a,f=c["".concat(s,".").concat(u)]||c[u]||d[u]||i;return n?r.createElement(f,o(o({ref:t},p),{},{components:n})):r.createElement(f,o({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var m=2;m<i;m++)o[m]=n[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}c.displayName="MDXCreateElement"},8013:function(e,t,n){n.d(t,{ZP:function(){return s}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={toc:[]};function s(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<inform-el>\n    <form>\n        <label>\n            First Name\n            <inform-field>\n                <input type="text" name="firstName" required />\n            </inform-field>\n        </label>\n        <label>\n            Last Name\n            <inform-field>\n                <input type="text" name="lastName" required minlength="2" />\n            </inform-field>\n        </label>\n        <button type="submit">Submit</button>\n    </form>\n</inform-el>\n')),(0,i.kt)("p",null,"Try submitting the empty form below to see the errors:"),(0,i.kt)("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/juliendelort/5Lfdzsew/13/embedded/result,html,js/"}),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),(0,i.kt)("inlineCode",{parentName:"h5"},"informel")," leverages ",(0,i.kt)("a",{parentName:"h5",href:"https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation"},"native form validation features")," and displays ",(0,i.kt)("a",{parentName:"h5",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage"},"native validation messages")," by default.")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"})))}s.isMDXComponent=!0},8680:function(e,t,n){n.d(t,{ZP:function(){return s}});var r=n(7462),a=n(3366),i=(n(7294),n(3905)),o=["components"],l={toc:[]};function s(e){var t=e.components,n=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("iframe",{width:"100%",height:"800",src:"//jsfiddle.net/juliendelort/rwz9gxu2/117/embedded/result,html,js,css"}))}s.isMDXComponent=!0},3015:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return g},default:function(){return N},frontMatter:function(){return v},metadata:function(){return k},toc:function(){return y}});var r,a=n(7462),i=n(3366),o=n(7294),l=n(3905),s=n(8013),m=n(8680),p=["title","titleId"];function d(){return d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},d.apply(this,arguments)}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=function(e){var t=e.title,n=e.titleId,a=c(e,p);return o.createElement("svg",d({xmlns:"http://www.w3.org/2000/svg",width:682.667,height:682.667,viewBox:"0 0 512 512","aria-labelledby":n},a),t?o.createElement("title",{id:n},t):null,r||(r=o.createElement("g",{fill:"#19c0c8"},o.createElement("path",{d:"M65 1.5C34.7 7.6 10.7 30.4 3 60.4 1 68.2 1 70.9 1 256s0 187.8 2 195.6c7.8 30.4 31.9 53.1 62.8 59 10.9 2.1 279.5 2.1 290.4 0 30.9-5.9 55-28.6 62.8-59 1.9-7.7 2-10.8 2-119 0-103.3.1-111.3 1.7-113.6 1-1.4 21.4-27.1 45.5-57.2l43.7-54.6-24.4-19.6C474.1 76.8 462.7 68 462.1 68c-.5 0-9.8 11.1-20.7 24.7l-19.9 24.8-.6-27c-.5-24.6-.7-27.6-2.8-34-7.9-23.9-25.5-42.7-47.7-51.1C355.6-.2 360.3 0 210.2.1 100.2.2 70.2.5 65 1.5zm291.2 41.3c6.7 2.7 15.7 10.5 19.3 16.6 5.4 9.2 5.4 9 5.6 60.6l.1 48-80.5 100.6c-65 81.3-80.6 101.3-81 104.3-.4 2-3 14.7-5.8 28.4-2.9 13.6-5 25-4.7 25.3.3.3 9.3-2 19.9-5.1 10.7-3.1 24.2-7.1 30.2-8.8l10.7-3.2 55.3-69.2c30.3-38.1 55.5-69.2 56-69.2 1-.1.8 156.9-.2 165.3-1.9 14.1-12.1 27.6-24.8 32.8l-5.8 2.3h-279l-5.8-2.3c-8.1-3.3-16.8-11.6-20.9-20l-3.3-6.7v-373l2.7-5.7c2.9-6.3 10.1-14.6 15.5-17.9 1.9-1.2 6-3 9.1-4 5.4-1.7 12.7-1.8 143.7-1.6l138 .2 5.7 2.3z"}),o.createElement("path",{d:"M95.5 116.9C86.7 121 82 128.3 82 138.1c0 11.1 6.1 19.3 16.4 22.4 7.4 2.2 217.8 2.2 225.2 0 10.3-3.1 16.4-11.3 16.4-22.4 0-9.8-4.7-17.1-13.5-21.2-3.8-1.8-9.3-1.9-115.5-1.9s-111.7.1-115.5 1.9zM126.5 216.9c-31.2.6-31.6.7-37.7 6.4-9.6 8.9-9.1 26.3 1 34.7 7.3 6.1 6.5 6 86.2 6s78.9.1 86.2-6c5.2-4.3 7.8-10.3 7.8-17.9 0-10.3-5.7-18.4-15.5-22.1-3.6-1.3-84.1-2-128-1.1zM118 318.9c-21.8.6-23.3 1-29.2 6.4-9.6 8.9-9.1 26.3 1 34.7 7.1 5.9 9.4 6.1 58.9 5.8 44.1-.3 44.9-.3 48.9-2.5 5.2-2.8 11.1-9.5 12.4-14.2 3.2-11.7-2.8-24.2-13.9-28.8-4-1.7-44.9-2.4-78.1-1.4z"}))))},f=function(){return o.createElement("h1",{style:{display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Poppins"}},o.createElement(u,{width:"10%",height:"10%"}),o.createElement("span",{style:{marginLeft:"20px",paddingTop:"5px"}},"informel"))},h=["components"],v={sidebar_position:1,hide_title:!0,custom_edit_url:null,title:"Getting Started",slug:"/"},g=void 0,k={unversionedId:"getting-started",id:"getting-started",title:"Getting Started",description:"informel is a Web Component that wraps your native HTML forms and gives them super powers.",source:"@site/docs/getting-started.mdx",sourceDirName:".",slug:"/",permalink:"/",editUrl:null,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,hide_title:!0,custom_edit_url:null,title:"Getting Started",slug:"/"},sidebar:"tutorialSidebar",next:{title:"Validation rules & error messages",permalink:"/validation-rules"}},y=[{value:"Installation",id:"installation",children:[{value:"CDN Installation",id:"cdn-installation",children:[],level:3},{value:"NPM/Yarn Installation",id:"npmyarn-installation",children:[],level:3}],level:2},{value:"Usage",id:"usage",children:[{value:"Basic Usage",id:"basic-usage",children:[],level:3},{value:"Showing validation errors",id:"showing-validation-errors",children:[],level:3}],level:2}],b={toc:y};function N(e){var t=e.components,n=(0,i.Z)(e,h);return(0,l.kt)("wrapper",(0,a.Z)({},b,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(f,{mdxType:"GetStartedHeader"}),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"informel")," is a Web Component that wraps your native HTML forms and gives them super powers."),(0,l.kt)("br",null),"Features:",(0,l.kt)("p",null,"\u2705 ","\xa0","Easily obtain form values",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 ","\xa0","Automatically show validation errors",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 ","\xa0","Native & custom validation rules",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 ","\xa0","Supports ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/colinhacks/zod"},"zod")," schemas",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 ","\xa0","Easily track form validity state",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 ","\xa0","Keep track of whether your form is dirty or not",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 ","\xa0","Support for nested fields (objects, arrays...)\n\u2705 ","\xa0",(0,l.kt)("strong",{parentName:"p"},"Auto submission via AJAX call, using ",(0,l.kt)("inlineCode",{parentName:"strong"},"action")," and ",(0,l.kt)("inlineCode",{parentName:"strong"},"method")," attributes")),(0,l.kt)("p",null,"Also:",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 Lightweight: ~20kb",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 Zero dependency",(0,l.kt)("br",{parentName:"p"}),"\n","\u2705 Relies on the platform: informel doesn't reimplement forms, it leverages native form features to enhance them.  "),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"informel")," is a headless library: all the styling belongs to you!"),(0,l.kt)("img",{src:"img/Twitter-logo.svg",width:"24",align:"center"}),"\xa0",(0,l.kt)("a",{href:"https://twitter.com/intent/follow?screen_name=informel_js"},"Follow on Twitter")," for updates!",(0,l.kt)("h2",{id:"installation"},"Installation"),(0,l.kt)("h3",{id:"cdn-installation"},"CDN Installation"),(0,l.kt)("p",null,"Add the following script to your HTML page"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<script src="https://unpkg.com/informel"><\/script>\n')),(0,l.kt)("p",null,"You can then start using ",(0,l.kt)("inlineCode",{parentName:"p"},"<inform-el />")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"<inform-field />")," elements anywhere in your HTML!."),(0,l.kt)("h3",{id:"npmyarn-installation"},"NPM/Yarn Installation"),(0,l.kt)("p",null,"Install the package:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-bash"},"npm i informel\nyarn add informel\n")),(0,l.kt)("p",null,"Then import ",(0,l.kt)("inlineCode",{parentName:"p"},"informel")," at the root level of your app:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"import 'informel';\n")),(0,l.kt)("p",null,"You can then start using ",(0,l.kt)("inlineCode",{parentName:"p"},"<inform-el />")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"<inform-field />")," elements anywhere in your HTML!."),(0,l.kt)("h2",{id:"usage"},"Usage"),(0,l.kt)("h3",{id:"basic-usage"},"Basic Usage"),(0,l.kt)("p",null,"Just wrap your native form in ",(0,l.kt)("inlineCode",{parentName:"p"},"<inform-el />"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-html"},'<inform-el>\n    <form>\n        <label>\n            First Name\n            <input type="text" name="firstName" />\n        </label>\n        <label>\n            Last Name\n            <input type="text" name="lastName" />\n        </label>\n        <button type="submit">Submit</button>\n    </form>\n</inform-el>\n')),(0,l.kt)("div",{className:"admonition admonition-danger alert alert--danger"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"}))),"Don't forget the ",(0,l.kt)("inlineCode",{parentName:"h5"},"<form>")," element!")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},(0,l.kt)("inlineCode",{parentName:"p"},"<inform-el>")," heavily relies on native Forms features!"))),(0,l.kt)("p",null,"Then you can listen to the ",(0,l.kt)("inlineCode",{parentName:"p"},"submit")," event on ",(0,l.kt)("inlineCode",{parentName:"p"},"<inform-el>")," which gives you the form values:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},"document.querySelector('inform-el').addEventListener('submit', ({ detail: { values } }) => {\n    console.log('Submitted:', values);\n});\n")),(0,l.kt)("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/juliendelort/hkpm5b2n/25/embedded/result,html/"}),(0,l.kt)("h3",{id:"showing-validation-errors"},"Showing validation errors"),(0,l.kt)("p",null,"In order to automatically show validation errors, wrap your form controls in ",(0,l.kt)("inlineCode",{parentName:"p"},"<inform-field />"),"."),(0,l.kt)(s.ZP,{mdxType:"InformFieldErrorPartialExample"}),(0,l.kt)("p",null,"Here is a more elaborated example that showcases some of ",(0,l.kt)("inlineCode",{parentName:"p"},"informel")," features:"),(0,l.kt)(m.ZP,{mdxType:"JokesExample"}),(0,l.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"You are still in full control of the styling and layout of your forms.")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"})),(0,l.kt)("p",null,"On top of that, ",(0,l.kt)("inlineCode",{parentName:"p"},"informel")," accepts custom validation rules, as well as custom error messages. For more information, see ",(0,l.kt)("a",{parentName:"p",href:"/validation-rules"},"validation rules & error messages"),"."))}N.isMDXComponent=!0}}]);