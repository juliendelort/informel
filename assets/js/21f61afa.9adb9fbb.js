"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[465],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return p}});var r=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,o=e.originalType,s=e.parentName,c=a(e,["components","mdxType","originalType","parentName"]),f=u(n),p=l,m=f["".concat(s,".").concat(p)]||f[p]||d[p]||o;return n?r.createElement(m,i(i({ref:t},c),{},{components:n})):r.createElement(m,i({ref:t},c))}));function p(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var o=n.length,i=new Array(o);i[0]=f;var a={};for(var s in t)hasOwnProperty.call(t,s)&&(a[s]=t[s]);a.originalType=e,a.mdxType="string"==typeof e?e:l,i[1]=a;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},6077:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return c},default:function(){return f}});var r=n(7462),l=n(3366),o=(n(7294),n(3905)),i=["components"],a={hide_title:!0,custom_edit_url:null,title:"Nested fields",sidebar_position:9},s="Nested fields",u={unversionedId:"nested_fields",id:"nested_fields",title:"Nested fields",description:"Informel supports nested fields (arrays or objects or arrays of objects). Just specify the object path in the name attribute of the field.",source:"@site/docs/nested_fields.mdx",sourceDirName:".",slug:"/nested_fields",permalink:"/nested_fields",editUrl:null,tags:[],version:"current",sidebarPosition:9,frontMatter:{hide_title:!0,custom_edit_url:null,title:"Nested fields",sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"Resetting the form & setting values",permalink:"/resetting"},next:{title:"Custom form controls",permalink:"/custom-elements"}},c=[{value:"Custom validation with nested fields",id:"custom-validation-with-nested-fields",children:[],level:2}],d={toc:c};function f(e){var t=e.components,n=(0,l.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"nested-fields"},"Nested fields"),(0,o.kt)("p",null,"Informel supports nested fields (arrays or objects or arrays of objects). Just specify the object path in the ",(0,o.kt)("inlineCode",{parentName:"p"},"name")," attribute of the field.\nFor example, the following form:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-html"},'<inform-el>\n    <form>\n        <label>\n            First Name\n            <input type="text" name="users[0].name.first" value="John" />\n        </label>\n        <label>\n            Last Name\n            <input type="text" name="users[0].name.last" value="Doe" />\n        </label>\n        <button type="submit">Submit</button>\n    </form>\n</inform-el>\n')),(0,o.kt)("p",null,"will yield the following values:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"{\n    users: [{\n        name: {\n            first: 'John',\n            last: 'Doe'\n        }\n    }];\n}\n")),(0,o.kt)("p",null,"For arrays, ",(0,o.kt)("inlineCode",{parentName:"p"},"users[0].name")," is equivalent to ",(0,o.kt)("inlineCode",{parentName:"p"},"users.0.name"),"."),(0,o.kt)("p",null,"Here is a live example:"),(0,o.kt)("iframe",{width:"100%",height:"700",src:"//jsfiddle.net/juliendelort/y2kL0csf/38/embedded/result,html,js",allowfullscreen:"allowfullscreen",allowpaymentrequest:!0,frameborder:"0"}),(0,o.kt)("h2",{id:"custom-validation-with-nested-fields"},"Custom validation with nested fields"),(0,o.kt)("p",null,"For setting ",(0,o.kt)("a",{parentName:"p",href:"/validation-rules#custom-validation-rules"},"custom validation rules"),", just return the full field path from the ",(0,o.kt)("inlineCode",{parentName:"p"},"validationHandler")," method:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"document.querySelector('inform-el').validationHandler = ({ values }) => {\n    if(values.users[0].name.first===' '){\n        return {\n            'values.users[0].name.first': 'No blank values!'\n        }\n    }\n};\n")),(0,o.kt)("p",null,"Check out the js tab of the live example above!"))}f.isMDXComponent=!0}}]);