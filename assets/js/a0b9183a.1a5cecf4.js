"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[128],{3905:function(e,t,r){r.d(t,{Zo:function(){return s},kt:function(){return d}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),u=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},s=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),f=u(r),d=i,m=f["".concat(c,".").concat(d)]||f[d]||p[d]||o;return r?n.createElement(m,a(a({ref:t},s),{},{components:r})):n.createElement(m,a({ref:t},s))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var u=2;u<o;u++)a[u]=r[u];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2108:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return s},default:function(){return f}});var n=r(7462),i=r(3366),o=(r(7294),r(3905)),a=["components"],l={sidebar_position:7,hide_title:!0,custom_edit_url:null,title:"Dirty Check"},c="Dirty Check",u={unversionedId:"dirty-check",id:"dirty-check",title:"Dirty Check",description:'A form is "dirty" if any of its field has changed since:',source:"@site/docs/dirty-check.mdx",sourceDirName:".",slug:"/dirty-check",permalink:"/informel/dirty-check",editUrl:null,tags:[],version:"current",sidebarPosition:7,frontMatter:{sidebar_position:7,hide_title:!0,custom_edit_url:null,title:"Dirty Check"},sidebar:"tutorialSidebar",previous:{title:"Submitting",permalink:"/informel/submitting"},next:{title:"Resetting the form & setting values",permalink:"/informel/resetting"}},s=[],p={toc:s};function f(e){var t=e.components,r=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"dirty-check"},"Dirty Check"),(0,o.kt)("p",null,'A form is "dirty" if any of its field has changed since:'),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"it was loaded"),(0,o.kt)("li",{parentName:"ul"},"or it was last reset"),(0,o.kt)("li",{parentName:"ul"},"or it was last submitted")),(0,o.kt)("p",null,"When the form is dirty:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"<inform-el/>")," has a ",(0,o.kt)("inlineCode",{parentName:"li"},"dirty")," attribute: ",(0,o.kt)("inlineCode",{parentName:"li"},"<inform-el dirty />"),"."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"<inform-el/>")," has a ",(0,o.kt)("inlineCode",{parentName:"li"},"dirty")," property:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'document.querySelector("inform-el").dirty; // true\n')),(0,o.kt)("p",null,"The example below uses the dirty attribute and CSS to show a warning only when the form is dirty:"),(0,o.kt)("iframe",{width:"100%",height:"600",src:"//jsfiddle.net/juliendelort/exm47c1b/5/embedded/result,html/",allowfullscreen:"allowfullscreen",allowpaymentrequest:!0,frameborder:"0"}),(0,o.kt)("p",null,'Try changing the first name: the warning appears.\nTry setting the first name back to "changeme": the warning disappears!'))}f.isMDXComponent=!0}}]);