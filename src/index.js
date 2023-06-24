let originalValue = ''
let prevValue = ''
let prevOriginalValue = ''

function updateOriginalValue (currentStringValue) {
  if (currentStringValue.length >= prevValue.length) {
    let j = 0
    originalValue = ''
    for(const element of currentStringValue) {
      if(j < prevValue.length && element === prevValue[j]) {
        if (prevValue[j] >= '0' && prevValue[j] <= '9') {
          originalValue += prevValue[j]
        }
        j++
      } else {
        originalValue += element
      } 
    }
    console.log(originalValue)
  } else {
    originalValue = ''
    for (const element of currentStringValue) {
      if (element >= '0' && element <= '9') {
        originalValue += element
      }
    }
  }
}

export function clearValues () {
  originalValue = ''
  prevValue = ''
  prevOriginalValue = ''
}



export function formatNumber (event) {
  const input = event.target
  let currentStringValue = input.value
  prevOriginalValue = originalValue
  updateOriginalValue(currentStringValue)
  originalValue = originalValue.substr(0, 10)
  if (originalValue.length && !(/^\d+$/.test(originalValue))) {
    originalValue = prevOriginalValue
  }
  currentStringValue = originalValue
  if (originalValue.length >= 3 && originalValue.length <= 6) {
    currentStringValue = `(${currentStringValue.substr(0, 3)}) ${currentStringValue.substr(3)}`
  }
  if (originalValue.length > 6) {
    currentStringValue = `(${currentStringValue.substr(0, 3)}) ${currentStringValue.substr(3, 3)}-${currentStringValue.substr(6)}`
  }
  prevValue = currentStringValue
  input.value = currentStringValue
}

