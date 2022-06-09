// -----------------------------------------
// global constants

// API endpoints
const api_key = "29ad49e172fb431f874b79cbe0ae49de"        // API key
// search
// const apiUrl = `http://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}`.toLowerCase()

// page elements
const headerDiv_Element = document.getElementById("header-Div")              // div labelled header
const form_H1_Div_Element = document.getElementById("form-H1-div")           // div containing form & 2nd h1 tag
const form_tag_Element = document.getElementById("Form")                     // form tag
const search_Label_Element = document.getElementById("Search-Label")         // search label (find all the latest movies...)
const search_Bar_Element = document.getElementById("Search-Bar")             // search bar
const search_Button_Element = document.getElementById("Search-Button")       // search button

// empty div for results
const resultsDiv_Element = document.getElementById("results-Div")

// -----------------------------------------
// results logic

const getResults = form_tag_Element.addEventListener("submit", async (API_results) => {
    API_results.preventDefault()

    let response = await fetch(apiUrl)
    let responseData = await response.json()

    displayResults(responseData)
})

// -----------------------------------------
// display logic

function displayResults(responseData) {
    responseData.forEach(resultsDiv_Element => {
        imgURL = responseData.images.fixed_height.url
        resultsDiv_Element.innerHTML +=  `
        <img src="${imgURL}" alt="Result GIF" /> 
    `
    }) 
}

// -----------------------------------------
// search form submit logic

form_tag_Element.addEventListener("submit", (submission) => {
    
})