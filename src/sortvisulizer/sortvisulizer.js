import React from 'react';
import './sortvisulizer.css';
import {getMergeSortAnimations} from '../sortalgorithm/sortalgorithm';

const ANIMATION_SPEED_MS = 5;
const NUMBER_OF_ARRAY_BARS = 210;
const PRIMARY_COLOR = 'lightgreen';
const SECONDARY_COLOR = 'red';
class sortvisulizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 530));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx] = animations[i];
        const [bartwoIdx] = animations[i];
        const barOnestyle = arrayBars[barOneIdx].style;
        const barTwostyle = arrayBars[bartwoIdx].style;

        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOnestyle.backgroundColor = color;
          barTwostyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOnestyle = arrayBars[barOneIdx].style;
          barOnestyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {}
  heapSort() {}
  bubbleSort() {}

  testSortAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptedArray, mergeSortedArray));
    }
  }
  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          ></div>
        ))}
        <div className="button">
          <button className="button-tab" onClick={() => this.resetArray()}>
            Generate New Array
          </button>
          <button className="button-tab" onClick={() => this.mergeSort()}>
            Merge Array
          </button>
          <button className="button-tab" onClick={() => this.quickSort()}>
            Quick Array
          </button>
          <button className="button-tab" onClick={() => this.heapSort()}>
            Heap Array
          </button>
          <button className="button-tab" onClick={() => this.bubbleSort()}>
            Bubble Array
          </button>
          <button
            className="button-tab"
            onClick={() => this.testSortAlgorithms()}
          >
            test Sort Algorithms
          </button>
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}

export default sortvisulizer;
