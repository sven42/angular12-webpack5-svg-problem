# angular12-webpack5-svg-problem
Showcase for a problem after updating from Angular Version 11 to 12

## Github issue: 

I filed an [issue](https://github.com/angular/angular-cli/issues/21738) which was closed as working as intended and a known breaking change.

## Questions
- As this is not an Angular bug
  - how can I configure additional loaders for webpack 5?
    - natively
    - [ngx-build-plus](https://github.com/manfredsteyer/ngx-build-plus) (as suggested in my [Github Issue](https://github.com/angular/angular-cli/issues/21738#issuecomment-918056358))
    - [angular-builders custom-webpack](https://github.com/just-jeb/angular-builders)
  - how can the root cause of problem be fixed, that the dependency to the react component @jupyterlab/ui-components [is importing SVG files as if they were ECMA modules](https://github.com/jupyterlab/jupyterlab/blob/7c5092e0d8d5d8e7fc2d1e51f8e4f9258d49922d/packages/ui-components/src/icon/iconimports.ts)?

## Steps to reproduce the error
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5 and later updated to Angular 12.2.9

Steps to break `ng build` and `ng serve` are:
- Create new angular-project with Angular-CLI 12
- Add jupyter-cell.component.ts with dependencies from jupyterlab, add css-styles, declare it in app.module.ts, set allowSyntheticDefaultImports to true to fix compiler error.
- Use jupyter-cell.component in app.component.html

Now ng build and ng serve claim about many SVG resources, e.g:
```
./node_modules/@jupyterlab/ui-components/style/icons/toolbar/undo.svg:1:0 - Error: Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> <svg viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
```

The same steps with angular 11 work just fine.
