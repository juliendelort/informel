<a href="https://juliendelort.github.io/informel/">
  <p align="center">
    <img src="https://github.com/juliendelort/informel/blob/main/docs/static/img/logo.svg" alt="logo" />
  </p>
</a>

![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/juliendelort/a679662706fd6e691c79282fffa16ada/raw/informel-tests-chromium.json)
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/juliendelort/a679662706fd6e691c79282fffa16ada/raw/informel-tests-firefox.json)
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/juliendelort/a679662706fd6e691c79282fffa16ada/raw/informel-tests-webkit.json)


# informel
`informel` is a Web Component that wraps your native HTML forms and gives them super powers.

<br />
Features:

✅ &nbsp;Easily obtain form values  
✅ &nbsp;Automatically show validation errors  
✅ &nbsp;Native & custom validation rules  
✅ &nbsp;Supports [zod](https://github.com/colinhacks/zod) schemas  
✅ &nbsp;Easily track form validity state  
✅ &nbsp;Keep track of whether your form is dirty or not  
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
