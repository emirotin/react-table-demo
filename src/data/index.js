// We start with some constants.
// `const` is one of the best ES6 features IMO.
// We'll see lots of it later.

const DATA1 = [
  { age: 1, name: 'Bob' },
  { age: 2, name: 'Alice' }
]

const DATA2 = [
  { age: 1, name: 'Joe' },
  { age: 2, name: 'Jane' }
]

const DATA3 = [
  { x: 0.5, y: 0.5 },
  { x: 0, y: 1 },
  { x: 1, y: 0 }
]

// And now we export an anonymous array literal.
// The `default` keyword marks that this is the _entire module_ export.

export default [
  { name: 'People-1', model: DATA1 },
  { name: 'People-2', model: DATA2 },
  { name: 'Dots', model: DATA3 },
]

// Let's go back to App.js now
