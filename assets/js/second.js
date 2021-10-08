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
      apiCall.innerHTML = `   
        <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="four wide column left floated">
          <img src="http://covers.openlibrary.org/b/isbn/${searchData.docs[0].isbn[0]}-M.jpg">
        </div>
        <div class="nine wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData.docs[0].title}</th>
          </thead>
          <tbody>
            <tr>
              <td>Author: ${searchData.docs[0].author_name}</td>
            </tr>
            <tr>
              <td>First Year Published: ${searchData.docs[0].first_publish_year}</td>
            </tr>
              <td>How Many Editions Exist: ${searchData.docs[0].edition_count}</td>
            <tr>
              <td>Some Characters: ${searchData.docs[0].person[Math.floor(Math.random() * (searchData.docs[0].person.length))]}, ${searchData.docs[0].person[Math.floor(Math.random() * (searchData.docs[0].person.length))]}, ${searchData.docs[0].person[Math.floor(Math.random() * (searchData.docs[0].person.length))]}</td>
            </tr>
          </tbody>
        </table> 
        </div>
        </div>`
     
      results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from open library
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Open Library(Search by name of the book)</th>
          <th>Open Library Covers(Search by ISBN)</th>
        </thead>
        <tbody>
          <tr>
            <td>Year a book was published</td>
            <td>Three options for sizes</td>
          </tr>
          <tr>
            <td>Author of the book</td>
            <td>Small-Thumbnail sized</td>
          </tr>
          <tr>
            <td>Year a book was published</td>
            <td>Medium-Decent size for a small container on a website</td>
          </tr>
          <tr>
            <td>Characters in the book</td>
            <td>Large-Full size image of cover</td>
          </tr>
        </tbody>
      </table>`
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

