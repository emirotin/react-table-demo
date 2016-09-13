// This is our main component

// Here we import `React` and also use a named import for `React.Component`.
// You can notice that `React` is not directly used anywhere in this module.
// But we still must import it for JSX to work.
// Why? Because `babel` (this thing that transpiles all the fancy ES6, https://babeljs.io/)
// has to tranform JSX to what it actually stands for — calls to `React.createElement`
// Check here if you're curious to see how it works: https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Ces2015-loose%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&experimental=true&loose=false&spec=false&code=import%20React%20from%20'react'%0A%0Aclass%20X%20extends%20React.Component%20%7B%7D%0A%0Aconst%20x%20%3D%20%3CX%20%2F%3E
import React, { Component } from 'react'

// This is a tiny but very useful utility for building the class strings.
// We'll see it soon.
import classnames from 'classnames'

// CSS import again. We've seen it before.
// You can go check that file (nothing interesting), then come back here.
import './App.css'

// We've moved the rest of the components to the corresponding folder.
// For now we know that we've loaded a `Table` component.
// We'll inspect it later.
import Table from './components/Table'

// Obviously we're loading some data fixtures here.
// It's a good idea to move some big constant data to separate modules.
// That helps make the code more readable and maintainable.
// Let's go and check what's there.
import DATA from './data'

// There are several ways to define a component.
// Here we use ES6 `class` because we need to maintain the state.
// The component defined this way _must_ inherit from the base
// `React.Component` class (ossibly indirectly).

class App extends Component {
  // There's a lot of going on in these 3 lines.
  // First, we use the ES proposed syntax for instance properties declaration.
  // It's a bit nicer than doing it in the constructor, but is effectively the same.
  // More here: https://github.com/tc39/proposal-class-public-fields

  // But then, `state` is a special React property.
  // You should only assign to it once (like here, or inside of the constructor).
  // And then you should update it with `.setState` method.
  // We'll see it soon.
  // For now it's obvious that we're going to keep a single `index` property
  // in our state.
  state = {
    index: 0
  }

  // OK this is obviously a method that changes the index.
  // There's something interesting here, too.
  // First, it's an instance property again.
  // Second, it's a fat arrow function that's a cool thing
  // because it keeps the proper reference to `this` no matter how it's called.
  // http://exploringjs.com/es6/ch_arrow-functions.html
  // We can see that `.setState` accepts an object that gets _merged_
  // into the existing state.
  setIndex = (index) => {
    this.setState({ index })
  }

  // Now let's jump _over_ these two methods and check the
  // `render` method below vvv

  renderButton = (model, index) => {
    // According to the `Array#map` signature
    // the callback gets two arguments passed to it.
    // The array element and its index

    // We compare the index to the currently selected index from the state
    const isCurrent = index === this.state.index

    // Here we use the nice `classnames` to build the conditional
    // class name for the button.
    // We use Bootstrap-provided classes.
    const className = classnames('btn', {
      'btn-default': !isCurrent,
      'btn-primary': isCurrent
    })

    // Now here's an important thing.
    // Inside of the `renderButtons` method we interpolate the result of
    // the `map` call.
    // This result will be an array in turn, specifically an array of
    // Reacy elements rendered by this `renderButton` method.
    // In such cases React requires that each of the elements in the list
    // has a unique `key` property.
    // We know that the index is unique so use it here as the key.

    // We also set the `onClick` (which is React's event name) handler
    // to be our `setIndex` method.
    // Notice how we build a no-args function that closes over the
    // `index` variable.

    // We also use the ternary operator to set `onClick` to `null`
    // for the currently selected button.
    return <button key={index}
      type="button" className={className}
      onClick={isCurrent ? null : () => this.setIndex(index)}>
      {model.name}
    </button>

    // OK, done. Jump to the end of the file.
  }

  renderButtons() {
    // This method is small and simple too.
    // Note that again we have to wrap multiple elements into a single
    // wrapper DIV.
    // JSX has no special syntax for loops.
    // Instead we use the native `Array#map` method.
    // I prefer not having any complex logic inside of JSX and defining
    // a separate render method for rendering the individual rows.
    // As the `renderButton` is defined as a fat arrow function
    // we don't have to worry about binding.

    // A small thing to note. JSX has two types of attributes.
    // Quoted attributes are used to pass _literal strings_.
    // Like `className` and `role` here.
    // Bracketed attributes are used to pass any other JS objects
    // (like `data` passed to `Table` in the `render` method below).

    // Let's go check the `renderButton` now.
    return <div>
      <strong>Set model:&nbsp;</strong>
      <div className="btn-group" role="group">
        {DATA.map(this.renderButton)}
      </div>
    </div>
  }

  // >>> Right here.
  // It's a special (and the only required) method of the `Component`.
  // It _projects_ the properties and state into the _virtual DOM_.
  // Let's see:

  render() {
    // This component doesn't have any _props_ (we didn't pass anything from index.js),
    // but it has some _state_.
    // It's a good habit to _unpack_ the props and state in the beginning of the method,
    // and then use the unpacked variables.

    // There's something interesting here.
    // We use `const` which may look counterintuitive.
    // It's not how we would do it in C++.
    // In ES6 it helps a lot to declare almost every variable as `const`.
    // The thing is you don't need to modify about 95% of the variables you have.
    // And the transpiler will protect you from doing it accidentally.

    // When you _have to_ modify something use `let`.
    // Never use `var` anymore.

    // We can also see the _destructuring_ assignment here
    // http://exploringjs.com/es6/ch_destructuring.html#_object-destructuring
    const { index } = this.state

    // Our method it really short. It's good.
    // We _must_ return a single element from the render method.
    // So we have a DIV wrapper here.
    // Not that we use `className` attribute instead of `class` in HTML.
    // React follows the DOM API spec which differs
    // from attributes naming a bit.
    // For example, you have to use `className` and `htmlFor`.
    // https://facebook.github.io/react/docs/tags-and-attributes.html#supported-attributes

    return <div className="App">
      {/*  Look, it's a JSX comment. */}
      {/*
        I've moved rendering the buttons section to a separate method.
        The buttons are used to switch between the different data models.
      */}
      {this.renderButtons()}
      {/*
        And here we render the table component, passing the data to it.
        It's an important moment here.
        Our `App` component is aware of the entire app idea.
        The app has access to several data collections.
        It renderes a list of buttons to switch between them.
        And it renders the table with the _current collection_.
        This description gives us an idea of what data this `App` component
        should have access to:
          * the data models list (we used a module-global DATA variable for that)
          * the currently selected model (we use the component state to store the index of it)
        Now we also realize that the buttons block should be able to modify the index in the state.
        Let's go and check the `.renderButtons` method.
      */}
      <Table data={DATA[index].model} />
    </div>
  }
}

export default App

// Cool, I hope this makes sense.
// Now let's jumpt to `components/Table.js` and see how it's built.
