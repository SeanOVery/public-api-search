const formEl = document.querySelector('.search-form'),
  apiTypeSearch = document.querySelector('.text'),
  apiSelect = document.querySelector('#api-select-dropdown')

let redirectURL = `./secondpage.html?`


$('.ui.dropdown')
  .dropdown()
;


formEl.addEventListener('submit', (ev) => {
  ev.preventDefault()
  let apiType = apiTypeSearch.innerText,
    apiSelection = apiSelect.value
  location.href = redirectURL + `apitype=${apiType}&apiselection=${apiSelection}`
})