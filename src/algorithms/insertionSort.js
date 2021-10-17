function insertionSortRun(array, animations) {
  for (let i = 1; i < array.length; i++) {
    animations.push([[i], false])
    const m = array[i]
    let j = i - 1
    while (j >= 0 && array[j] > m) {
      animations.push([[j, j + 1, i], false])
      array[j + 1] = array[j]
      animations.push([[j + 1, array[j]], true])
      j -= 1
    }
    array[j + 1] = m
    animations.push([[j + 1, m], true])
  }
}


export function getInsertionSort(array) {
  const animations = []
  if (array.length <= 1) return array
  const copy = [...array]
  insertionSortRun(copy, animations)
  return animations
}

export const insertionSortInfo = {
  isRunning: true,
  algoTitle: 'Insertion Sort',
  algoDescription: 'A simple algorithm that iterates through an array and at each iteratoin it remove one element from the array, finds the location it belongs to in the sorted list and inserts it there, repeating until no elements remain in the unsorted list.',
  wcTime: 'O(n²)',
  avcTime: 'O(n²)',
  beTime: 'O(n)',
  wcSpace: 'O(1)',
}