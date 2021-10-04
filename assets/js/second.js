const apiTypeFromForm = document.querySelector('#api-type'),
  results = document.querySelector('#results')

let artInstituteUrl = 'https://api.artic.edu/api/v1/artworks/search?q=cats'

const getResults = () => {
  let queryStr = document.location.search.split('&'),
    apiType = queryStr[0].split('0')[1]
    apiTypeFromForm.textContent = `Bringing in the api type: ${apiType} in order to help choose which fetch call to use`
    apiToFetch = queryStr[1].split('=')[1]
    results.textContent = `A box will got here showing a useful set of results from the ${apiToFetch} API`

}

getResults()

function getInfo() {
  fetch(artInstituteUrl)
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data)
    })
}

getInfo()