import React, { Component } from 'react'
import './App.css'

import Table from './components/Table'

const DATA = [
  { age: 1, name: 'Bob' },
  { age: 2, name: 'Alice' }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <Table data={DATA} />
      </div>
    )
  }
}

export default App
