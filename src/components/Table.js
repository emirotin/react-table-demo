import React, { Component } from 'react'

import TableHead from './TableHead'
import TableBody from './TableBody'

export default class Table extends Component {
  constructor(args) {
    super(...args)
    this.state = {
      sorting: {
        column: null,
        direction: null
      }
    }
  }

  extractColumns(data) {
    return data && data.length ? Object.keys(data[0]) : []
  }

  render() {
    const { data } = this.props
    const columns = this.extractColumns(data)
    return <table className="table">
      <TableHead columns={columns} />
      <TableBody data={data} columns={columns} />
    </table>
  }
}
