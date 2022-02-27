"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[705],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),f=s(n),m=i,d=f["".concat(c,".").concat(m)]||f[m]||p[m]||o;return n?r.createElement(d,a(a({ref:t},u),{},{components:n})):r.createElement(d,a({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=n[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5965:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return f}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),a=["components"],l={sidebar_position:5,hide_title:!0,custom_edit_url:null,title:"Listening for changes"},c="Listening for changes",s={unversionedId:"listening-for-changes",id:"listening-for-changes",title:"Listening for changes",description:"`` relays the following native events, with some added information:",source:"@site/docs/listening-for-changes.mdx",sourceDirName:".",slug:"/listening-for-changes",permalink:"/informel/docs/listening-for-changes",editUrl:null,tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5,hide_title:!0,custom_edit_url:null,title:"Listening for changes"},sidebar:"tutorialSidebar",previous:{title:"Getting form values",permalink:"/informel/docs/getting-form-values"},next:{title:"Submitting",permalink:"/informel/docs/submitting"}},u=[],p={toc:u};function f(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"listening-for-changes"},"Listening for changes"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"<inform-el />")," relays the following native events, with some added information:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event"},"input")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event"},"change"))),(0,o.kt)("p",null,"Both events contain a ",(0,o.kt)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail"},"detail")," field, which is an object with the following fields:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"values")," : the current form values."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"changedField"),": the name of the field that changed.")),(0,o.kt)("p",null,"Here is an example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<inform-el>\n    <form>\n        <label>\n            First Name\n            <input type="text" name="firstName" />\n        </label>\n        <label>\n            Last Name\n            <input type="text" name="lastName" />\n        </label>\n        <button type="submit">Submit</button>\n    </form>\n</inform-el>\n\n<script>\n    document.querySelector("inform-el").addEventListener("input", ({ detail: { values, changeField } }) => {\n        // After typing \'a\' in "First Name":\n        console.log("Values:", values); // {firstName: \'a\', lastName: \'\'}\n        console.log("Changed field:", changeField); // "firstName"\n    });\n<\/script>\n')))}f.isMDXComponent=!0}}]);