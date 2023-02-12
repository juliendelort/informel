![badge](https://kitchen-p241dm8lt-juliendelort.vercel.app/api/badge?badgeUrl=https%3A%2F%2Fimg.shields.io%2Fendpoint%3Furl%3Dhttps%3A%2F%2Fgist.githubusercontent.com%2Fjuliendelort%2Fa679662706fd6e691c79282fffa16ada%2Fraw%2Finformel-tests-chromium.json%26style%3Dflate-square)
![badge](https://kitchen-p241dm8lt-juliendelort.vercel.app/api/badge?badgeUrl=https%3A%2F%2Fimg.shields.io%2Fendpoint%3Furl%3Dhttps%3A%2F%2Fgist.githubusercontent.com%2Fjuliendelort%2Fa679662706fd6e691c79282fffa16ada%2Fraw%2Finformel-tests-firefox.json%26style%3Dflat-square)
![badge](https://kitchen-p241dm8lt-juliendelort.vercel.app/api/badge?badgeUrl=https%3A%2F%2Fimg.shields.io%2Fendpoint%3Furl%3Dhttps%3A%2F%2Fgist.githubusercontent.com%2Fjuliendelort%2Fa679662706fd6e691c79282fffa16ada%2Fraw%2Finformel-tests-webkit.json%26style%3Dflat-square)


# <img src="https://github.com/juliendelort/informel/blob/main/docs/static/img/logo.svg" alt="logo" width="30px"/> informel
`informel` is a Web Component that wraps your native HTML forms and gives them super powers.

<br />
Features:

✅ &nbsp;Easily obtain form values  
✅ &nbsp;Automatically show validation errors  
✅ &nbsp;Native & custom validation rules  
✅ &nbsp;Supports [zod](https://github.com/colinhacks/zod) schemas  
✅ &nbsp;Easily track form validity state  
✅ &nbsp;Keep track of whether your form is dirty or not  
✅ &nbsp;Support for nested fields (objects, arrays...) 
✅ &nbsp;**Auto submission via AJAX call, using `action` and `method` attributes**

`informel` is a headless library: all the styling belongs to you!

Documentation: https://juliendelort.github.io/informel/

[Changelog](https://github.com/juliendelort/informel/blob/main/CHANGELOG.md) 


## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Dev

### Svelte/Webcomponent

In `main.js`, import `test.svelte`. Then run
  
```bash
npm run dev
```

### React

```bash
cd react-dev
npm run dev
```

Changes to the core `informel` library (non react changes) need to be rebuilt to be visible.
