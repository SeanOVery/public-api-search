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

const foodApiFunc = () => {
  let callUrl = ''

  if (apiToFetch === 'foodish') {
    callUrl = 'https://foodish-api.herokuapp.com/api/'
    fetch(callUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json ()
      } else if (response.status === 500) {
        throw new Error('500 Internal Server Error')
      }
    })
    .then(data => {
      // console.log(data)
      searchData = data
    apiCall.innerHTML = `
    <h1> Example API Call<h1>
    <div class="ui medium image">
    <img src= ${searchData.image}>
    </div>
    `
    results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Types of Information/Resources gathered from Foodish
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Foodish Random Image Search</th>
        </thead>
        <tbody>
          <tr>
            <td>1 random food image is returned</td>
          </tr>
        </tbody>
      </table>
    `
    })
    .catch((error) => {
      errorDiaglogEl.innerHTML = `<p>${error}<p>`
      $('.ui.basic.modal')
      .modal('show')
      ;
    })
    
  } else if (apiToFetch === 'openBrew') {
    callUrl = 'https://api.openbrewerydb.org/breweries'
    fetch(callUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json ()
      } else if (response.status === 500) {
        throw new Error('500 Internal Server Error')
      }
    })
    .then(data => {
      // console.log(data)
      searchData = data
      var letObj0 = searchData[Math.floor(Math.random() * searchData.length)]
      var letObj1 = searchData[Math.floor(Math.random() * searchData.length)]
      var letObj2 = searchData[Math.floor(Math.random() * searchData.length)]
    apiCall.innerHTML = `
    <h1>Example Api Call</h1>   
    <table class="ui celled inverted table">
      <thead>
        <tr><th>Name</th>
        <th>Type</th>
        <th>Address</th>
      </tr></thead>
      <tbody>
        <tr>
          <td data-label="Name">${letObj0.name}</td>
          <td data-label="Type">${letObj0.brewery_type}</td>
          <td data-label="Address">${letObj0.city}, ${letObj0.state} - ${letObj0.postal_code}</td>
        </tr>
        <tr>
          <td data-label="Name">${letObj1.name}</td>
          <td data-label="Type">${letObj1.brewery_type}</td>
          <td data-label="Address">${letObj1.city}, ${letObj1.state} - ${letObj1.postal_code}</td>
        </tr>
        <tr>
          <td data-label="Name">${letObj2.name}</td>
          <td data-label="Type">${letObj2.brewery_type}</td>
          <td data-label="Address">${letObj2.city}, ${letObj2.state} - ${letObj2.postal_code}</td>
        </tr>
      </tbody>
    </table>
    `
    results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Types of Information/Resources gathered from Open Brew
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Open Brew Search</th>
        </thead>
        <tbody>
          <tr>
            <td>3 random breweries are returned</td>
          </tr>
          <tr>
            <td>The planning types of those breweries</td>
          </tr>
          <tr>
            <td>The City/State and Postal Code are returned</td>
          </tr>
        </tbody>
      </table>
    `
    })
    .catch((error) => {
      errorDiaglogEl.innerHTML = `<p>${error}<p>`
      $('.ui.basic.modal')
      .modal('show')
      ;
    })

  } else if (apiToFetch === 'punkAPI') {
    callUrl = 'https://api.punkapi.com/v2/beers/random'
    fetch(callUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json ()
      } else if (response.status === 500) {
        throw new Error('500 Internal Server Error')
      }
    })
    .then(data => {
      // console.log(data)
      searchData = data
    apiCall.innerHTML = `
      <h1>Example Api Call</h1>   
        <div class="ui grid">
        <div class="four wide column left floated centered">
          <div class="ui small image">
            <img src= ${searchData[0].image_url}>
          </div>
        </div>
        <div class="ten wide column">
        <table class="ui attached inverted table center aligned">
          <thead>
            <th>${searchData[0].name}</th>
          </thead>
          <tbody>
            <tr>
              <td>ABV Content -  ${searchData[0].abv}% </td>
            </tr>
            <tr>
              <td>First Brewed - ${searchData[0].first_brewed} </td>
            </tr>
              <td>Volume - ${searchData[0].volume.value} ${searchData[0].volume.unit} </td>
            <tr>
              <td>Tagline - ${searchData[0].tagline} </td>
            </tr>
          </tbody>
        </table> 
        </div>
        </div>
    `
    results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Other Resources/Information gathered from Punk API
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Punk API Search</th>
        </thead>
        <tbody>
          <tr>
            <td>The ingredients used in each ale are found in an object.</td>
          </tr>
          <tr>
            <td>A short and concise description of each and every beverage in their database.</td>
          </tr>
          <tr>
            <td>"Brewer's Tips" which are tips from the original brewer on how to perfect the flavor</td>
          </tr>
          <tr>
            <td>"Food Pairing" which is gathered in an array, which lists the best foods that pair with the pulled beverage.</td>
          </tr>
        </tbody>
      </table>
    `
    })
    .catch((error) => {
      errorDiaglogEl.innerHTML = `<p>${error}<p>`
      $('.ui.basic.modal')
      .modal('show')
      ;
    })
  } else if (apiToFetch === 'coffee') {
    callUrl = 'https://cors-anywhere.herokuapp.com/https://coffee.alexflipnote.dev/random.json'
    fetch(callUrl)
    .then(response => {
      if (response.status === 200) {
        return response.json ()
      } else if (response.status === 500) {
        throw new Error('500 Internal Server Error')
      }
    })
    .then(data => {
      // console.log(data)
      searchData = data
    apiCall.innerHTML = `
    <h1> Example API Call<h1>
    <div class="ui medium image">
    <img src= ${searchData.file}>
    </div>
    `
    results.innerHTML = `
    <div class="ui top attached inverted segment center aligned">
        Types of Information/Resources gathered from Coffee
      </div>
      <table class="ui attached inverted table center aligned">
        <thead>
          <th>Coffee Random Image Search</th>
        </thead>
        <tbody>
          <tr>
            <td>1 random coffee image is returned</td>
          </tr>
        </tbody>
      </table>
    `

    })
    .catch((error) => {
      errorDiaglogEl.innerHTML = `<p>${error}<p>`
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
    foodApiFunc ()
  }

}

init()
