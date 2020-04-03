#  Demo Job Portal

Frontend using Angular v8, using Angular CLI

>Warning: Make sure you're using the latest version of Node.js(v8+) and NPM (v5+)

Frameworks: Angular 8, Typescript 3, Sass

# Deployment Instructions
```
npm install
npm install --global gulp-cli
gulp make
```

# Development instructions

## Install Angular CLI, Dependencies and Gulp
```
npm install
npm install --global gulp-cli
npm install -g @angular/cli
sudo npm start
```



## Internationalization

To mark static text as translatable, add the `i18n` attribute. For example:
```
<a class="dropdown-item" i18n="@@logoutMsg">Logout</a>
```

To generate messages file for translation: `ng xi18n --output-path locale` in the root folder

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


