export function getQuickSort(array) {
  const animations = []
  if (array.length <= 1) return array
  const copy = [...array]
  quickSortRun(copy, 0, array.length - 1, animations)
  return animations
}

function quickSortRun(array, begin, finish, animations) {
  if (begin < finish) {
    const pi = partition(array, begin, finish, animations)
    quickSortRun(array, begin, pi - 1, animations)
    quickSortRun(array, pi + 1, finish, animations)
  }
}

function partition(array, begin, finish, animations) {
  let i = begin
  let j = finish + 1
  const condition = true
  const pivot = array[begin]
  while (condition) {
    while (array[++i] <= pivot) {
      if (i === finish) break
      animations.push([[i], false])
    }
    while (array[--j] >= pivot) {
      if (j === begin) break
      animations.push([[j], false])
    }
    if (j <= i) break
    animations.push([[i, array[j]], true])
    animations.push([[j, array[i]], true])
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  animations.push([[begin, array[j]], true])
  animations.push([[j, array[begin]], true])
  const temp = array[begin]
  array[begin] = array[j]
  array[j] = temp
  return j
}

export const quickSortInfo = {
  isRunning: true,
  algoTitle: 'Quick Sort',
  algoDescription: 'Is an efficient, in-place sorting algorithm that in practice is faster than MergeSort and HeapSort. However, it is not a stable sorting algorithm, meaning that the relative positioning of equal sort items is not preserved. Quicksort is a divide and conquer algorithm.',
  wcTime: 'O(𝘯²)',
  avcTime: 'O(𝘯log𝘯)',
  beTime: 'O(𝘯log𝘯)',
  wcSpace: 'O(log𝘯)',
}