// export function getBubbleSort(arr) {
//   const animations = []
//   if (arr.length <= 1) return arr
function bubbleSortRun(array, animations) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animations.push([[j, j + 1], false])
      if (array[j] > array[j + 1]) {
        animations.push([[j, array[j + 1]], true])
        animations.push([[j + 1, array[j]], true])
        const t = array[j]
        array[j] = array[j + 1]
        array[j + 1] = t
      }
    }
  }
}

export function getBubbleSort(array) {
  const animations = []
  if (array.length <= 1) return array
  const copy = [...array]
  bubbleSortRun(copy, animations)
  return animations
}

export const bubbleSortInfo = {
  isRunning: true,
  algoTitle: 'Bubble Sort',
  algoDescription: 'A simple algorithm that repeadedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
  wcTime: 'O(n²)',
  avcTime: 'O(n²)',
  beTime: 'O(n)',
  wcSpace: 'O(1)',
}
