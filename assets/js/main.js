const formEl = document.querySelector('.search-form'),
  apiTypeSearch = document.querySelector('.text'),
  apiSelect = document.querySelector('#api-select-dropdown'),
  apiTypeSelect = document.querySelector('.api-type-select'),
  artArr = ['Art Institute of Chicago', 'Colour Lovers', 'Icon Horse', 'Metropolitan Museum of Art', 'PHP-Noise', 'Pixel Encounter'],
  artArrShort = ['artchicago', 'colourovers','iconhorse','metart', 'phpnoise','pixelencounter']

let redirectURL = `./secondpage.html?`,
  arr,
  arrShort


$('.ui.dropdown')
  .dropdown()
;


formEl.addEventListener('submit', (ev) => {
  ev.preventDefault()
  let apiType = apiTypeSearch.innerText,
    apiSelection = apiSelect.value
  location.href = redirectURL + `apitype=${apiType}&apiselection=${apiSelection}`
})

function setDropdown(event) {
  let target = event.target,
    val
  if (target.hasAttribute('data-select')) {
    val = target.innerText.trim()
  }

  if (val === 'Art') {
      arr = artArr
      arrShort = artArrShort
      dropdownCreation()
  }
}

function dropdownCreation() {
  while (apiSelect.firstChild) {
    apiSelect.removeChild(apiSelect.firstChild)
  }
  for (let i = 0; i < arr.length; i++) {
    let newOption = document.createElement('option')

    newOption.setAttribute('value', arrShort[i])
    newOption.textContent = arr[i]
    apiSelect.append(newOption)

  }
}

apiTypeSelect.addEventListener('click', setDropdown)