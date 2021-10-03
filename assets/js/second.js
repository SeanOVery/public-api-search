const apiTypeFromForm = document.querySelector('#api-type'),
  results = document.querySelector('#results')

const getResults = () => {
  let queryStr = document.location.search.split('&'),
    apiType = queryStr[0].split('0')[1]
    apiTypeFromForm.textContent = `Also bringing in the api type: ${apiType} in order to help choose which fetch call to use`
    apiToFetch = queryStr[1].split('=')[1]
    results.textContent = `A box will got here showing a useful set of results from the ${apiToFetch} API`

}

getResults()