const apiCall = document.querySelector('#api-call'),
  results = document.querySelector('.results-container'),
  recentSearchEl = document.querySelector('#recent-search-dropdown'),
  errorDialogEl = document.querySelector('#dialog')

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

  if (apiToFetch === 'nytBooks') {
    callUrl = 'https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=Sqt8pojApVeCMUYS08uRPxR68Fn4xtGA'
    fetch(callUrl)
    .then(response => {
      if (response.status === 200) {
      return response.json()
      } else if (response.status === 500) {
        throw new Error('500 Internal Server Error')
      }
    })
      .then(data => {
        console.log(data)
        searchData = data
      apiCall.innerHTML = `   
        <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="sixteen wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData.results[0].book_title} by ${searchData.results[0].book_author}</th>
          </thead>
          <tbody>
            <tr>
              <td>Link to NYT review: <a target="_blank" href="${searchData.results[0].url}">${searchData.results[0].book_title} review by ${searchData.results[0].byline}</a></td>
            </tr>
            <tr>
              <td>Summary: ${searchData.results[0].summary}</td>
            </tr>
              <td>Review's Date of Publication: ${searchData.results[0].publication_dt}</td>
          </tbody>
        </table> 
        </div>
        </div>`
     
      results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from the library of congress
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>New York Times Book Review Search</th>
          <th>New York Times Top lists Search</th>
        </thead>
        <tbody>
          <tr>
            <td>Search For book reviews by Author, Book Title, or ISBN</td>
            <td>Search for NYT top seller lists</td>
          </tr>
          <tr>
            <td>Whichever search query you use the other two are returned in the response</td>
            <td>Publication date, Author name, Title</td>
          </tr>
          <tr>
            <td>A 1 sentence summary is returned</td>
            <td>Rank on best sellers list</td>
          </tr>
          <tr>
            <td>A link to the full review</td>
            <td>A link to purchase the book on amazon</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch(error => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal')
        .modal('show')
        ;
      })

  } else if (apiToFetch === 'libOfCongress') {
    callUrl = 'https://www.loc.gov/search/?q=baseball&fo=json'
    fetch(callUrl)
    .then(response => {
      if (response.status === 200) {
      return response.json()
      } else if (response.status === 500) {
        throw new Error('500 Internal Server Error')
      }
    })
      .then(data => {
        searchData = data
      apiCall.innerHTML = `   
        <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="four wide column left">
          <img src="${searchData.results[0].image_url[0]}">
        </div>
        <div class="twelve wide column right">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData.results[0].title}</th>
          </thead>
          <tbody>
            <tr>
              <td>Link to LOC article: <a target="_blank" href="${searchData.results[0].url}">${searchData.results[0].title}</a></td>
            </tr>
            <tr>
              <td>Whether article is fully digitized: ${searchData.results[0].digitized}</td>
            </tr>
              <td>Subjects this article covers: ${searchData.results[0].subject[0]}, ${searchData.results[0].subject[1]}</td>
          </tbody>
        </table> 
        </div>
        </div>`
     
      results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from the library of congress
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Library of Congress(General Search)</th>
          <th>Library of Congress(Search by Format)</th>
        </thead>
        <tbody>
          <tr>
            <td>General search provides a very wide range of information including the following and more</td>
            <td>Search allowing specification by some of the following formats</td>
          </tr>
          <tr>
            <td>Link to article on LOC website</td>
            <td>Maps, Documents</td>
          </tr>
          <tr>
            <td>Subjects the article covers</td>
            <td>Audio Files, Films, Sheet Music</td>
          </tr>
          <tr>
            <td>Whether the article is fully digitized</td>
            <td>Archived Websites</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch(error => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal')
        .modal('show')
        ;
      })


  } else if (apiToFetch === 'openLibrary') {
    callUrl = 'https://openlibrary.org/search.json?q=the+lord+of+the+rings'
    fetch(callUrl)
      .then(response => {
        if (response.status === 200) {
        return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then(data => {
        searchData = data
      apiCall.innerHTML = `   
        <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="four wide column left floated">
          <img src="http://covers.openlibrary.org/b/isbn/${searchData.docs[0].isbn[0]}-M.jpg">
        </div>
        <div class="ten wide column">
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
            <td>How many editions of the book exist</td>
            <td>Medium-Decent size for a small container on a website</td>
          </tr>
          <tr>
            <td>Characters in the book</td>
            <td>Large-Full size image of cover</td>
          </tr>
        </tbody>
      </table>`
      })
      .catch(error => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal')
        .modal('show')
        ;
      })

  } else if (apiToFetch === 'poemist'){
    callUrl = 'https://www.poemist.com/api/v1/randompoems'
    fetch(callUrl)
      .then(response => {
        if (response.status === 200) {
        return response.json()
        } else if (response.status === 500) {
          throw new Error('500 Internal Server Error')
        }
      })
      .then(data => {
        searchData = data
      apiCall.innerHTML = `
      <h1>Example Api Call</h1>  
      <div style="width: 60vw;">
      <div class="ui inverted segment">
        <div class="ui inverted accordion">
          <div class="active title">
          <i class="dropdown icon"></i>
            ${searchData[0].title} by ${searchData[0].poet.name}
          </div>
        <div class="active content">
          <p>${searchData[0].content}</p>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
            ${searchData[1].title} by ${searchData[1].poet.name}
        </div>
        <div class="content">
          <p>${searchData[1].content}</p>
        </div>
        <div class="title">
          <i class="dropdown icon"></i>
            ${searchData[2].title} by ${searchData[2].poet.name}
        </div>
        <div class="content">
          <p>${searchData[1].content}</p>
        </div>
        </div>
      </div>
      </div>`
     
      results.innerHTML = `<div class="ui top attached inverted segment center aligned">
        Types of Information you can gather from poemist
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Poemist Random Poem Search</th>
        </thead>
        <tbody>
          <tr>
            <td>5 random poems are returned</td>
          </tr>
          <tr>
            <td>Title of the poems</td>
          </tr>
          <tr>
            <td>Content of the poems</td>
          </tr>
          <tr>
            <td>Author of the poems</td>
          </tr>
        </tbody>
      </table>`
      })
      .then(() => {
        $('.ui.accordion').accordion('refresh');
      })
      .catch(error => {
        errorDialogEl.innerHTML = `<p>${error}</p>`
        $('.ui.basic.modal')
        .modal('show')
        ;
      })
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
