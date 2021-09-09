# angular12-webpack5-svg-problem
Showcase for a problem after updating from Angular Version 11 to 12

Github issue: https://github.com/angular/angular-cli/issues/21738

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.5.

## Steps to reproduce the error

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

## Questions
- Is this a bug in Angular 12?
- If this is not a bug, how can I configure additional loaders for webpack 5?
  - natively
  - ngx-build-plus, https://github.com/manfredsteyer/ngx-build-plus
  - angular-builders custom-webpack, https://github.com/just-jeb/angular-builders 
