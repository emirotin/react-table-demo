import React, { Component } from 'react'

export default class TableBody extends Component {
  renderCell = data => cellName => {
    return <td key={cellName}>{data[cellName]}</td>
  }

  renderRow = (data, key) => {
    const renderCell = this.renderCell(data)
    return <tr key={key}>
      {this.props.columns.map(renderCell)}
    </tr>
  }

  render() {
    return <tbody>
      {this.props.data.map(this.renderRow)}
    </tbody>
  }
}
