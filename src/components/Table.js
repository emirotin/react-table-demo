import React, { Component } from 'react'
import { orderBy } from 'lodash'

import TableHead from './TableHead'
import TableBody from './TableBody'

export default class Table extends Component {
  constructor(props, args) {
    super(props, ...args)

    const columns = this.extractColumns(props.data)
    this.state = {
      sorting: this.getDefaultSorting(columns)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    const columns = this.extractColumns(data)
    if (!columns.includes(this.state.sorting.column)) {
      const sorting = this.getDefaultSorting(columns)
      this.setState({ sorting })
    }
  }

  extractColumns(data) {
    return data && data.length ? Object.keys(data[0]) : []
  }

  getDefaultSorting(columns) {
    return {
      column: columns[0],
      direction: true
    }
  }

  getSortedData() {
    const { data } = this.props
    const { sorting } = this.state
    return orderBy(data, [ sorting.column ], [ sorting.direction ? 'asc' : 'desc' ])
  }

  setSorting = (column) => {
    const { sorting: { column: currentColumn, direction: currentDirection } } = this.state
    const direction = column === currentColumn
      ? !currentDirection
      : true
    this.setState({
      sorting: { column, direction }
    })
  }

  render() {
    const columns = this.extractColumns(this.props.data)
    const { sorting } = this.state
    const data = this.getSortedData()

    return <table className="table">
      <TableHead columns={columns} sorting={sorting} setSorting={this.setSorting} />
      <TableBody data={data} columns={columns} />
    </table>
  }
}
