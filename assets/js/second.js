const apiTypeFromForm = document.querySelector('#api-type'),
  results = document.querySelector('#results'),
  recentSearchEl = document.querySelector('#recent-search-dropdown')

let recentSearchArr = []

  const init = () => {
    let storedRecents = JSON.parse(localStorage.getItem('recents'))
  
      if (storedRecents !== null) {
        recentSearchArr = storedRecents
      }
    createRecentSearchLinks()
  }

const getResults = () => {
  let queryStr = document.location.search.split('&'),
    apiType = queryStr[0].split('0')[1]
    apiTypeFromForm.textContent = `Bringing in the api type: ${apiType} in order to help choose which fetch call to use`
    apiToFetch = queryStr[1].split('=')[1]
    results.textContent = `A box will got here showing a useful set of results from the ${apiToFetch} API`

}

getResults()


const createRecentSearchLinks = () => {
  for (let i = 0; i < recentSearchArr.length; i++) {
    let newA = document.createElement('a')
    newA.classList.add('item')
    newA.textContent = recentSearchArr[i][2]
    newA.href = `./secondpage.html?apitype=${recentSearchArr[i][0]}&apiselection=${recentSearchArr[i][1]}`
    recentSearchEl.append(newA)
  }
}


init()