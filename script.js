// -----------------------------------------
// GLOBAL VARIABLES/CONSTANTS

// API
const api_key = "29ad49e172fb431f874b79cbe0ae49de"
const language = "en-US"

// DOM elements:
// ~~~~~~~~~~~~~
// basic display text
let h1_nowPlaying = document.getElementById("H1-nowPlaying")
let h1_searchResults = document.getElementById("H1-searchResults")
// search elements
let search_form = document.getElementById("form")
let search_input = document.getElementById("search-input")
let search_btn = document.getElementById("search-btn")
let close_search_btn = document.getElementById("close-search-btn")
// movie grid
let movies_grid = document.getElementById("movies-grid")
// load more button
let load_more_movies_btn = document.getElementById("load-more-movies-btn")
// back to top button
let top_btn = document.getElementById("back-to-top")
// ~~~~~~~~~~~~~

// other
let page = 1


// -----------------------------------------
// "NOW PLAYING" MOVIE LIST FUNCTION

async function nowPlaying() {

    // hides/unhides display text
    h1_nowPlaying.hidden = false
    h1_searchResults.hidden = true

    // gets movies from "now playing" page
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=${language}&page=${page}&include_adult=true`)
    const responseData = await response.json()
    
    // displays each movie on page
    for (let i=0; i < responseData.results.length; i++) {
        displayResults(responseData.results[i])
    }

}


// -----------------------------------------
// SUBMITTING SEARCH RESULTS FUNCTION/EVENT LISTENER

// with Find Movies button
search_form.addEventListener("submit", (event) => {

    // keeps page from reloading
    event.preventDefault()
    
    // empties the movie grid
    movies_grid.innerHTML = ""

    // resets page to 1
    page = 1

    // calls function to display search results
    movieResults(event)

})

// with Enter key
search_form.addEventListener("keypress", function(event) {

    if (event.code === "Enter") {
        // keeps page from reloading
        event.preventDefault()
        
        // empties the movie grid
        movies_grid.innerHTML = ""

        // resets page to 1
        page = 1

        // calls function to display search results
        movieResults(event)
    }

})


// -----------------------------------------
// CLEAR SEARCH RESULTS FUNCTION/EVENT HANDLER

close_search_btn.addEventListener("click", () => {
    
    // clears text in search bar
    search_input.value = ""

    // clears search results
    movies_grid.innerHTML = ``

    // goes back to "now playing" screen
    nowPlaying()

})

// -----------------------------------------
// **UNFINISHED** DISPLAYING SEARCH RESULTS FUNCTION

async function movieResults(search_query) {

    // assigns the value entered into search bar
    search_query = search_input.value

    // ** NEED IF STATEMENTS FOR LINES 73-87 **

    // (if search input CAN be found, ...)
    // gets matching movies from value entered in search bar
    let response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=${language}&query=${search_query}&page=${page}&include_adult=true`)
    let responseData = await response.json()
    
    // displays search results
    for (let i=0; i < responseData.results.length; i++) {
        displayResults(responseData.results[i])
    }

    // hides/unhides display text
    h1_nowPlaying.hidden = true
    h1_searchResults.hidden = false

    // changes display text to include the search value entered 
    h1_searchResults.innerHTML = `Showing results for ${search_query}:`


    // if statement #2 (if search input CANNOT be found, ...)
    // ~~~~~~~~~~~~~
    // start here

}


// -----------------------------------------
// ADDING MOVIES TO PAGE FUNCTION

function displayResults(movieData) {

    // creates new div inside existing empty div, then displays movie info on page
    let posterImage = "http://image.tmdb.org/t/p/w500" + movieData.poster_path

    movies_grid.innerHTML += `
        <div  class= "movie-cards">
            <img  class= "movie-poster"  title= "${movieData.title == null ? "Not Available" : movieData.title}"  src= "${movieData.poster_path == null ? "no-image-icon.png" : posterImage}"
            
            <div  id= "movie-info">
                <br>

                <p1  class= "movie-title"> ${movieData.title == null ? "Not Available" : movieData.title} </p1>

                <br><br>

                <p2  class= "movie-release-date"> Release Date: </p2>
                <p3> ${movieData.release_date == null ? "Not Available" : movieData.release_date} </p3>

                <br>

                <p2  class= "movie-votes"> Rating: </p2>
                <p3>  ${movieData.vote_average == null ? "Not Available" : movieData.vote_average + "/10  <img  alt= star  src= images/star.png> "} </p3>
                
                <br><br><br><br>
            </div>
        </div>
         `

}


// -----------------------------------------
// LOAD MORE MOVIES FUNCTION/EVENT LISTENER

load_more_movies_btn.addEventListener("click", () => {

    // goes to next page on "now playing" page 
    page ++

    // if nothing was searched, loads more "now playing" movies; otherwise loads more search results
    if (search_input.value != "") {
        movieResults(search_input.value)
    } else {
        nowPlaying()
    }

})


// -----------------------------------------
// SCROLL & BACK TO TOP FUNCTIONS

function backToTop() {

    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0

}

// -----------------------------------------
// ONLOAD FUNCTION 

window.onload = function() {

    // calls function to load immediately as the website loads
    nowPlaying()

}
