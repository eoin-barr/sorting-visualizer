

function bubbleSortRun(arr, animations) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      animations.push([[j, j + 1], false])

      if (arr[j] > arr[j + 1]) {
        animations.push([[j, arr[j + 1]], true])
        animations.push([[j + 1, arr[j]], true])
        const t = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = t
      }
    }
  }
}

export function getBubbleSort(arr) {
  const animations = []
  if (arr.length <= 1) return arr
  const copy = arr.slice()
  bubbleSortRun(copy, animations)
  return animations
}