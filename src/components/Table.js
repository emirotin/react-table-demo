/*
  So, this is the Table component.
  Before diving into it let's make a bit of planning.
  What are we trying to achieve?
    * We need a component to render the data
    * The data will be passed in as a property
    * The data will be an array of homogenous objects
    * We want the table to have a header and a body
    * We want the table to be sortable:
      * It's sorted ASC by the first column by default
      * Clicking on a different column name sorts ASC by that column
      * Clicking on the same column name alters the sorting order
  To achieve this we will create two helper components:
    * TableHead
    * TableBody
  The first one will render the header with sorting capabilities.
  The second one will simply render the data that's passed to it.
  These two components will be "dumb" and won't contain any logic.
  Our current component will be the "smart" orchestrator.
  It should be clear by now that the entire tree depends on 3 things:
    * the original data
    * the column to sort by
    * the sorting direction
  The first of them is a prop(erty) of the component.
  The remaining two could live in its state because in the current application
  there's nobody outside of this component who cares about how it handles sorting
  and what is the current sorting state (but it can be different in other applications).

  Enough of theory, let's check how it's done.
*/

// As usual we import Reract
import React, { Component } from 'react'

// Note how I only import a single methods form the big `lodash` library.
// Some day in the future this will allow us to get benefit of
// _tree shaking_: http://www.2ality.com/2015/12/webpack-tree-shaking.html
import { orderBy } from 'lodash'

// Our dumb children components. We'll check them later.
import TableHead from './TableHead'
import TableBody from './TableBody'

export default class Table extends Component {
  // From our plan we know that we want to
  // store the column and the direction in the state, as well as
  // sort by the first column by default.
  // We will extract the column names from the first data object.
  // Then pick the first column for the initial state.
  // As this requires a bit of code I've decided to handle it
  // in the constructor, not with the instance property.
  constructor(props, ...args) {
    // When defining the constructor for the child class
    // one _must_ call the parent (`super`) constructor.
    // Notice how I've used rest args to swallow the arguments
    // I don't use myself and pass them here.
    // http://exploringjs.com/es6/ch_first-steps.html#_from-arguments-to-rest-parameters
    super(props, ...args)

    // Get the column names from the data (see how we get data from props),
    // then get the default sorting and set the initial state.
    const columns = this.extractColumns(props.data)
    this.state = {
      sorting: this.getDefaultSorting(columns)
    }

    // Note that we could store the `columns` beceause we will need them later,
    // but such behavior is discouraged.
    // The idea is that you should never attach to the component somehting
    // that can be derived from the state and/or props.
  }

  // Now this is something interesting.
  // It's a lifecycle hook https://facebook.github.io/react/docs/component-specs.html
  // that is being called when the component is going to pick the
  // new properties.
  componentWillReceiveProps(nextProps) {
    // Here we recalculate the columns because...
    const { data } = nextProps
    const columns = this.extractColumns(data)

    // ... if the data shape has changed and the currently selected
    // sorting column is no longer available
    // we want to resort to the default (AS by the first column) again.
    if (!columns.includes(this.state.sorting.column)) {
      const sorting = this.getDefaultSorting(columns)
      this.setState({ sorting })
    }
  }

  // It's a simple helper method
  extractColumns(data) {
    return data && data.length ? Object.keys(data[0]) : []
  }

  // This too
  getDefaultSorting(columns) {
    return {
      column: columns[0],
      direction: true
    }
  }

  // This method is a bit more interesting.
  // Sorted data is something that again can be calculated using the
  // props and the state of the sorting.
  // It makes sense to keep this logic in the smart component,
  // or in a separate service (if the computations involve more business logic).

  // We could pass the raw data and the sorting paeams to the table body,
  // but that would be an anti-pattern.

  // We could store the sorted data in the state
  // (and recalculate it when the props or state change),
  // but as explained above that's a bad habit too.
  getSortedData() {
    const { data } = this.props
    const { sorting } = this.state
    return orderBy(data, [ sorting.column ], [ sorting.direction ? 'asc' : 'desc' ])
  }

  // Now we have an interesting question.
  // Our header component is dumb.
  // And React data flow is uni-directional.
  // How would the child _change_ the parent's data?
  // The answer is the child should be passed a callback,
  // and the parent should define this callback.
  // It makes the child completely agnostic and ready for universal usage.
  // So this is the method the child will be calling with the name
  // of the column to sort by.
  setSorting = (column) => {
    // Here we use some sophisticated nested destructuring
    // to get the current state
    const {
      sorting: {
        column: currentColumn,
        direction: currentDirection
      }
    } = this.state
    // If the column is already sorted by alter the direction,
    // otherwise sort ASC.
    const direction = column === currentColumn
      ? !currentDirection
      : true
    // Ready, steady, set the state.
    this.setState({
      sorting: { column, direction }
    })
  }

  // And finally the render method, small as usual.
  render() {
    // Calculate the column names
    const columns = this.extractColumns(this.props.data)
    // Get the sorting (we'll see soon how it's used).
    const { sorting } = this.state
    // Get the sorted data
    const data = this.getSortedData()

    return <table className="table">
      {/*
        The head is getting passed:
          * the column names,
          * the current state of the sorting (we'll see soon what for),
          * and a method to change the sorting.
      */}
      <TableHead columns={columns} sorting={sorting} setSorting={this.setSorting} />
      {/*
        The body receives the data and the column names
        (to render the data in the correct order).
      */}
      <TableBody data={data} columns={columns} />
    </table>
  }
}

// Great, let's go check the TableHead.js
