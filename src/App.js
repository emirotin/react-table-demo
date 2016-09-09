import React, { Component } from 'react'
import classnames from 'classnames'

import './App.css'

import Table from './components/Table'

import DATA from './data'

class App extends Component {
  state = {
    index: 0
  }

  setIndex = (index) => {
    this.setState({ index })
  }

  renderButton = (model, index) => {
    const isCurrent = index === this.state.index
    const className = classnames('btn', {
      'btn-default': !isCurrent,
      'btn-primary': isCurrent
    })
    return <button key={index}
      type="button" className={className}
      onClick={isCurrent ? null : () => this.setIndex(index)}>
      {model.name}
    </button>
  }

  renderButtons() {
    return <div>
      <strong>Set model:&nbsp;</strong>
      <div className="btn-group" role="group">
        {DATA.map(this.renderButton)}
      </div>
    </div>
  }

  render() {
    const { index } = this.state
    return <div className="App">
      {this.renderButtons()}
      <Table data={DATA[index].model} />
    </div>
  }
}

export default App
