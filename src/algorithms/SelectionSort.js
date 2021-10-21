export function getSelectionSort(array) {
  const animations = []
  if (array.length <= 1) return
  const copy = [...array]
  selectionSortRun(copy, animations)
  return animations
}

function selectionSortRun(array, animations) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < array.length; j++) {
      animations.push([[j, i], false])
      if (array[j] < array[minIndex])
        minIndex = j
    }
    animations.push([[i, array[minIndex]], true])
    animations.push([[minIndex, array[i]], true])
    const temp = array[i]
    array[i] = array[minIndex]
    array[minIndex] = temp
  }
}

export const selectionSortInfo = {
  isRunning: true,
  algoTitle: 'Selection Sort',
  algoDescription: 'Is an in-place coparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted, which is built up from left to right at the front (left) of the list, and the sublist of items remaining to be sorted that occupy the rest of the list. The algoithm proceeds by finding the smallest element in the unsorted, exchanging (swapping) it with the leftmost undsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.',
  wcTime: 'O(n²)',
  avcTime: 'O(n²)',
  beTime: 'O(n²)',
  wcSpace: 'O(1)',
}