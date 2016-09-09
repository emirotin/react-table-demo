import React, { Component } from 'react'

export default class TableHead extends Component {
  renderColumn = (column) => {
    return <th key={column}>{column}</th>
  }
  render() {
    return <thead>
      <tr>{this.props.columns.map(this.renderColumn)}</tr>
    </thead>
  }
}
