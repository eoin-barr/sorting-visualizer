import React from 'react'
import SortingVisualizer from './visualizer/SortingVisualizer'


class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <SortingVisualizer />
      </div>
    )
  }

}

export default App
