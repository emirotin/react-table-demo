/*
  This is the main entry point for our application.
  CRApp has configured Webpack [https://webpack.github.io/]
  to load it in development, and it will follow other modules
  imported by this one.
  During the production build Webpack again will use this file
  and build a single bundle pulling the imported modules together.
*/

/* This file is intentionally left tiny.
  It only loads the required modules and wires them together.
  Let's see how it works.
*/

// We start by loading two React modules.
// `react` is the library itself
// `react-dom` is the _renderer_ that makes React app run in the HTML DOM
import React from 'react'
import ReactDOM from 'react-dom'

// Throughout the entire application we use ES6 modules.
// Read here if you're unfamiliar with them:
// * http://www.2ality.com/2014/09/es6-modules-final.html
// * http://exploringjs.com/es6/ch_modules.html

// By convention we call the main component for the entrire application `App`
// We'll jump there soon, but for now we should know that
// the module defines the root component.
import App from './App'

// Wait, what's that? Importing CSS as a JS module?
// That's fine. The `extract-text-webpack-plugin` is configured
// to understand them and collect for a separate output in the `webpack` bundle.
// In development such files will be injected as `<style>` tags.
// For production they will be combined into a single CSS bundle and
// linked automaticaly thanks to the `html-webpack-plugin`.
import './index.css'

// Now let's quickly jump into that ^index.css file and then come back here.

// OK you're back, hi again.

// What's going on here?
// Well, we obviously render something.
// What is that in the first arg? It's JSX. Like kind of XHTML inside of JS.
// Read here if you're curious:
// https://facebook.github.io/react/docs/jsx-in-depth.html
// Basically we just instantiate the `App` component (without any properties passed).
// The next line defines the root element to render the component to.
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

// So far so good, let's go and check the `App.js` now, where all the fun begins.
