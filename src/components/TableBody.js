// Well, this component is even simpler.
// It gets the sorted data and the column (property names)
// and renders a row for each data in the list,
// with a cell for each column name.
// Hopefully it doesn't need any code annotations.

import React from 'react'

const renderCell = data => cellName => {
  return <td key={cellName}>{data[cellName]}</td>
}

const renderRow = columns => (data, index) => {
  const _renderCell = renderCell(data)
  return <tr key={index}>
    {columns.map(_renderCell)}
  </tr>
}

const TableBody = props => {
  const { data, columns } = props
  const _renderRow = renderRow(columns)
  return <tbody>
    {data.map(_renderRow)}
  </tbody>
}

export default TableBody

// And now we're done!
