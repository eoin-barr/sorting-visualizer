import React from 'react'
import { getBubbleSort } from '../algorithms/BubbleSort'

// import combineReducers from '../reducers'


const ANIMATION_SPEED = 1
const MAIN_COLOR = '#5ac75c'
const CHANGE_COLOR = 'blue'



export default class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      lines: [],
      sorting: false,
    }
  }

  componentDidMount() {
    this.resetArr()
    window.addEventListener('resize', this.resetArr.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetArr.bind(this))
  }

  resetArr() {
    if (this.state.sorting) return
    const arr = []
    const width = window.innerWidth
    const containerWidth = width - 100
    const numLines = containerWidth / 4

    const containerHeight = window.innerHeight
    const maxLineHeight = Math.max((containerHeight - 350), 100)

    for (let i = 0; i < numLines; i++) {
      arr.push(randNumFromInterval(5, maxLineHeight))
    }
    this.setState((state) => {
      return { lines: arr }
    })
  }

  bubbleSort() {
    if (this.state.sorting) return
    this.setState((state) => {
      return { sorting: true }
    })
    const animations = getBubbleSort(this.state.lines)
    this.animate(animations)
  }


  animate(animations) {
    const arrLines = document.getElementsByClassName('arr-line')
    let m = 0
    for (let i = 0; i < animations.length; i++) {
      const colorChange = !animations[i][1]
      if (colorChange) {
        const lines = animations[i][0]
        setTimeout(() => {
          for (let j = 0; j < lines.length; j++) {
            arrLines[lines[j]].style.backgroundColor = CHANGE_COLOR
          }
        }, m++ * ANIMATION_SPEED)
        setTimeout(() => {
          for (let j = 0; j < lines.length; j++) {
            arrLines[lines[j]].style.backgroundColor = MAIN_COLOR
          }
        }, m++ * ANIMATION_SPEED)
      } else {
        setTimeout(() => {
          const [lineOne, newHeight] = animations[i][0]
          const lineOneStyle = arrLines[lineOne].style
          lineOneStyle.height = `${newHeight}px`

        }, m++ * ANIMATION_SPEED)
      }

      if (i === animations.length - 1) {
        setTimeout(() => {
          this.setState((state) => {
            return {
              lines: this.state.lines.sort(function (a, b) {
                return a - b
              }),
              sorting: false,
            }
          })
        }, m++ * ANIMATION_SPEED)
      }
    }
  }





  render() {
    const arr = this.state.lines
    return (
      <div className="container arr-container">
        {arr.map((value, index) => (
          <div
            className="arr-line"
            key={index}
            style={{ height: `${value}px` }}
          ></div>
        ))}
        <p>Choose A Sorting Algorithm</p>
        <div className="" style={{ display: 'block' }}>
          <button className="ui button primary" onClick={() => this.bubbleSort()}>Bubble Sort</button>
        </div>
      </div>
    )
  }
}


function randNumFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

