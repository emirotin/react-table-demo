import React from 'react'
import classnames from 'classnames'

// Oh wait, what is it? Where's our Component class?
// Well, let's jump to the `TableHead` method to see vvv

const renderChevron = direction => {
  // This is a very simple method.
  // Given the direction it renders an icon
  // with the proper class.
  // The classes are provided by Bootstrap.
  return <i className={
    classnames('glyphicon', {
      'glyphicon-chevron-down': !direction,
      'glyphicon-chevron-up': direction
    })
  }></i>
}

// So essentially we define a method factory.
// It closes over the shared props passed to it
// and returns a function that only depends on the current column.
const renderColumn = (sorting, setSorting) => column => {
  // We create a no-args version of `setSorting`
  const _setSorting = () => setSorting(column)

  // Render a cell (remember about the `key`, we're in the loop again).
  // Pass the click callback
  // And render the sorting order indicator for the current column.
  // Note how JSX also doesn't have anything for conditionally rendering
  // nodes, so we use the standard boolean operator.
  // We could also use a ternary operator for the if-else clause.
  // React has a special handling for `null` and `false` because of this:
  // https://facebook.github.io/react/tips/false-in-jsx.html
  return <th key={column}>
    <button className="btn btn-link btn-md"
      onClick={_setSorting}>
      {column}
    </button>
    {sorting.column === column &&
      renderChevron(sorting.direction)
    }
  </th>

  // Now let's check the `renderChevron` method
}

// >>> It's a simplified component creation method supported by React.
// A functional stateless component.
// Our `TableHead` component is dumb, so it doesn't have any state,
// and it also doesn't need any lifecycle hooks.
// So essentially it's a simple pure mapping from its props
// to a React element.
// In that case you can actually define the entire component as a single function.

const TableHead = props => {
  // We start by unpacking all the props
  const { columns, sorting, setSorting } = props

  // As before I have a separate method to render the column.
  // But it also needs some info other than the column name.
  // Namely, the current staye of the sorting, and the
  // callback to change it.
  // But we no longer have a class instance to share the props across the mehtods.

  // Let's jump higher and check how this function is defined.
  const _renderColumn = renderColumn(sorting, setSorting)

  // The rest is trivial — render the wrapping THEAD and TR
  // and a cell for each column name.
  return <thead>
    <tr>{columns.map(_renderColumn)}</tr>
  </thead>
}

export default TableHead

// Now we're almost done.
// Let's check the remaining `TableBody.js`
