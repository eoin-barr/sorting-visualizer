import React from 'react'
import { connect } from 'react-redux'
import { bubbleSortInfo, getBubbleSort } from '../algorithms/BubbleSort'
import { getInsertionSort, insertionSortInfo } from '../algorithms/insertionSort'
import { getMergeSort, mergeSortInfo } from '../algorithms/MergeSort'
import { getQuickSort, quickSortInfo } from '../algorithms/QuickSort'
import { getSelectionSort, selectionSortInfo } from '../algorithms/SelectionSort'

const ANIMATION_SPEED = 1
const MAIN_COLOR = '#5ac75c'
const CHANGE_COLOR = 'blue'

class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      array: this.props.array,
      isRunning: this.props.isRunning,
      algoTitle: this.props.algorithm.algoTitle,
      algoDescription: this.props.algorithm.algoDescription,
      wcTime: this.props.algorithm.wcTime,
      avcTime: this.props.algorithm.avcTime,
      beTime: this.props.algorithm.beTime,
      wcSpace: this.props.algorithm.wcSpace,
    }
  }

  componentDidMount() {
    this.resetArray()
    window.addEventListener('resize', this.resetArray.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetArray.bind(this))
  }

  resetArray() {
    if (this.state.isRunning) return
    const array = []
    const width = window.innerWidth
    const containerWidth = width - 100
    const numLines = containerWidth / 4

    const containerHeight = window.innerHeight
    const maxLineHeight = Math.max((containerHeight - 400), 100)

    for (let i = 0; i < numLines; i++) {
      array.push(randNumFromInterval(5, maxLineHeight))
    }
    this.setState(() => {
      return { array: array }
    })
  }




  animate(animations) {
    const arrLines = document.getElementsByClassName('array-line')
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
          this.setState(() => {
            return {
              array: this.state.array.sort(function (a, b) {
                return a - b
              }),
              isRunning: false,
            }
          })
        }, m++ * ANIMATION_SPEED)
      }
    }
  }


  bubbleSort() {
    if (this.state.isRunning) return
    this.setState(() => {
      return bubbleSortInfo
    })
    const animations = getBubbleSort(this.state.array)
    this.animate(animations)
  }

  insertionSort() {
    if (this.state.isRunning) return
    this.setState(() => {
      return insertionSortInfo
    })
    const animations = getInsertionSort(this.state.array)
    this.animate(animations)
  }

  quickSort() {
    if (this.state.isRunning) return
    this.setState(() => {
      return quickSortInfo
    })
    const animations = getQuickSort(this.state.array)
    this.animate(animations)
  }

  selectionSort() {
    if (this.state.isRunning) return
    this.setState(() => {
      return selectionSortInfo
    })
    const animations = getSelectionSort(this.state.array)
    this.animate(animations)
  }

  mergeSort() {
    if (this.state.isRunning) return
    this.setState(() => {
      return mergeSortInfo
    })
    const animations = getMergeSort(this.state.array)
    this.animate(animations)
  }


  render() {
    const array = this.state.array
    return (
      <>
        <div className="array-container">
          {array.map((value, index) => (
            <div
              className="array-line"
              key={index}
              style={{ height: `${value}px` }}
            ></div>
          ))}
          <div className="flex-center">
            <h4>Choose A Sorting Algorithm</h4>
          </div>
          <div className="flex-wrap">
            <button className={`ui button pink ${this.state.isRunning ? 'disabled' : 'hover-enable'}`} onClick={() => this.resetArray()}>Reset Array</button>
            <button className={`ui button primary ${this.state.isRunning ? 'disabled' : 'hover-enable'}`} onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button className={`ui button primary ${this.state.isRunning ? 'disabled' : 'hover-enable'}`} onClick={() => this.insertionSort()}>Insertion Sort</button>
            <button className={`ui button primary ${this.state.isRunning ? 'disabled' : 'hover-enable'}`} onClick={() => this.quickSort()}>Quick Sort</button>
            <button className={`ui button primary ${this.state.isRunning ? 'disabled' : 'hover-enable'}`} onClick={() => this.selectionSort()}>Selection Sort</button>
            <button className={`ui button primary ${this.state.isRunning ? 'disabled' : 'hover-enable'}`} onClick={() => this.mergeSort()}>Merge Sort</button>
          </div>
        </div>
        <div>
          <div className="flex-center">
            <h1 className="h1-font-size">Sorting Visualizer</h1>
          </div>
          <hr />
          {this.state.isRunning && (
            <div className="ui container bg-grey animate-content">
              <div className="main-max-width">
                <h2>{this.state.algoTitle}</h2>
                <p>{this.state.algoDescription}</p>
              </div>
              <div className="sub-max-width">
                <h2>Performance</h2>
                <p className="full-width">Worst-case time complexity <span className="float-right">{this.state.wcTime}</span></p>
                <p className="full-width">Average time complexity <span className="float-right">{this.state.avcTime}</span></p>
                <p className="full-width">Best-case time complexity <span className="float-right">{this.state.beTime}</span></p>
                <p className="full-width">Worst-case space complexity <span className="float-right">{this.state.wcSpace}</span></p>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}


function randNumFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const mapStateToProps = (state) => {
  return {
    array: state.array,
    isRunning: state.isRunning,
    algorithm: state.algorithm,
  }
}

const mapDispatchToProps = () => () => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(SortingVisualizer)