import React, { Component } from 'react'
import classnames from 'classnames'

export default class TableHead extends Component {
  setSorting = (column) => {
    this.props.setSorting(column)
  }

  renderChevron(direction) {
    return <i className={
      classnames('glyphicon', {
        'glyphicon-chevron-down': !direction,
        'glyphicon-chevron-up': direction
      })
    }></i>
  }

  renderColumn = (column) => {
    const { sorting } = this.props

    return <th key={column}>
      <button className="btn btn-link btn-md"
        onClick={() => this.setSorting(column)}>{column}</button>
      {sorting.column === column &&
        this.renderChevron(sorting.direction)
      }
    </th>
  }

  render() {
    return <thead>
      <tr>{this.props.columns.map(this.renderColumn)}</tr>
    </thead>
  }
}
