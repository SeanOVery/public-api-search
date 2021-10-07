const apiCall = document.querySelector('#api-call'),
  results = document.querySelector('.results-container'),
  recentSearchEl = document.querySelector('#recent-search-dropdown')

let recentSearchArr = [],
  queryStr = document.location.search.split('&'),
  apiType = queryStr[0].split('0')[1],
  apiToFetch = queryStr[1].split('=')[1],
  searchData = []

  const init = () => {
    let storedRecents = JSON.parse(localStorage.getItem('recents'))
  
      if (storedRecents !== null) {
        recentSearchArr = storedRecents
      }
    createRecentSearchLinks()
    checkApiType()
  }

// const getResults = () => {
//     apiCall.textContent = `Bringing in the api type: ${apiType} in order to help choose which fetch call to use`
//     results.textContent = `A box will go here showing a useful set of results from the ${apiToFetch} API`
// }

// getResults()


const createRecentSearchLinks = () => {
  for (let i = 0; i < recentSearchArr.length; i++) {
    let newA = document.createElement('a')
    newA.classList.add('item')
    newA.textContent = recentSearchArr[i][2]
    newA.href = `./secondpage.html?apitype=${recentSearchArr[i][0]}&apiselection=${recentSearchArr[i][1]}`
    recentSearchEl.append(newA)
  }
}


const booksApiFunc = () => {
  let callUrl = ''

  if (apiToFetch === 'britNatBiblio') {

  } else if (apiToFetch === 'libOfCongress') {

  } else if (apiToFetch === 'openLibrary') {
    callUrl = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings'
    fetch(callUrl)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        searchData = data
        apiCall.innerHTML = `<h3>${searchData.docs[0].title}</h3>
        <ul>
        <li>Author: ${searchData.docs[0].author_name}
        <li>First Year Published: ${searchData.docs[0].first_publish_year}</li>
        <li>How Many Editions Exist: ${searchData.docs[0].edition_count}</li>
        <li>Some Characters: ${searchData.docs[0].person[Math.floor(Math.random() * (searchData.docs[0].person.length))]}, ${searchData.docs[0].person[Math.floor(Math.random() * (searchData.docs[0].person.length))]}, ${searchData.docs[0].person[Math.floor(Math.random() * (searchData.docs[0].person.length))]}</li>
        </ul>`
        results.innerHTML = `<h4>Open Library can give you useful information such as the following</h4>
        <ol>
        <li>The Author of a work</li>
        <li>The first year that work was published</li>
        <li>How many editions of that work exists</li>
        <li>Characters in the work</li>
        </ol>`
      })

  } else {

  }

}

const checkApiType = () => {
  if (apiType === 'Art') {
    //artApiFunc
  } else if (apiType === 'Books'){
    booksApiFunc()
  } else {
    //food&drink func
  }

}

init()

// fetch('https://api.artic.edu/api/v1/artworks/129884')
//   .then(response => {
//     return response.json()
//   })
//   .then(data => {
//     console.log(data)
//     console.log(data.data.date_display)
//     apiCall.innerHTML = `<h4>${data.data.date_display}</h4>`
//   })