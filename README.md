# ironwood
a boilerplate to start the most basic projects

## About Ironwood
This project was created to be a boilerplate for creating simple frontend sites (HTML,CSS,JS) with the help of more advanced tools like a task runner (Gulp) with various plugins (sass, babel, autoprefixer, autoreload, etc..) to make development more efficient.

## Prerequisites
You need to have [`node.js`](https://nodejs.org/en/) and `npm`(comes with node.js) installed in your computer.

You also need to be familiar with the task runner [`gulp.js`](https://gulpjs.com/) since that is the backbone of this project. (Please do send a pull request if you want to implement a different task runner or to use plain npm scripts). There is a good [tutorial](https://css-tricks.com/gulp-for-beginners/) from css-tricks on how to use gulp.

This project also assumes you have basic knowledge with [Sass](https://sass-lang.com/).

## Project Structure
```
├───src -> Source files for the project
│   ├───img -> Image assets
│   ├───videos -> Video assets
│   ├───fonts  -> font assets
│   ├───scss -> Sass styles
│   │   └───styles.scss -> Main file in where all other sass files should be included.
│   └───html -> htmls 
│   │   ├───components -> Htmls to be used for gulp-html-extend
│   └───js -> Scripts
├───package.json -> NodeJS configuration file for manage node and project dependencies
├───gulpfile.js -> Gulp Tasks
```

## Features
* Local http server with autoreload ([Browsersync](https://browsersync.io/))
* [Babel](https://babeljs.io/docs/en/index.html)  to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in old browsers or environments.
* Autoprefixer to automatically add prefix to css properties that require different prefix for different browsers
* Sourcemaps for js and css to easily debug js and css code in the browser

All features mentioned above are already set up and integrated to the gulp tasks.

## How to use
1. Make sure you run `npm install` to install project dependencies.
2. To start the local server and start developing, run `npm run dev` in the terminal.
3. To build site for production (which means no more sourcemapps and minifiying all css and js files), run `npm run build-prod`

## Addding additional js/css libraries

To add additional libraries, make sure they are installed through npm (or bower/yarn) and then add their paths in the src of `copy:plugins:js` and `copy:plugins:css` gulp tasks (or you can also import the sass src of the library in `styles.scss`). 
Update your imports in the `<head></head>` in the html accordingly.
