// -----------------------------------------
// GLOBAL VARIABLES/CONSTANTS

// API
const api_key = "29ad49e172fb431f874b79cbe0ae49de"

// DOM elements:
// ~~~~~~~~~~~~~
// basic display text
let h1_nowPlaying = document.getElementById("H1-nowPlaying")
let h1_searchResults = document.getElementById("H1-searchResults")
// search elements
const query = document.getElementById("search-input").value
let search_input = document.getElementById("search-input")
let search_btn = document.getElementById("search-btn")
let close_search_btn = document.getElementById("close-search-btn")
// movie grid
let movies_grid = document.getElementById("movies-grid")
// load more button
let load_more_movies_btn = document.getElementById("load-more-movies-btn")
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
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US`)
    const responseData = await response.json()
    
    // displays each movie on page
    for (let i=0; i < responseData.results.length; i++) {
        displayResults(responseData.results[i])
    }

}

// -----------------------------------------
// SUBMITTING SEARCH RESULTS EVENT LISTENER

search_input.addEventListener("submit", (event) => {

    // keeps page from reloading
    event.preventDefault()
    
    // calls function to display search results
    movieResults(event)

})

// -----------------------------------------
// **UNFINISHED** DISPLAYING SEARCH RESULTS FUNCTION

async function movieResults(event) {

    // keeps page from reloading
    event.preventDefault()

    // empties the movie grid
    movies_grid.innerHTML = ""

    // ** IF STATEMENTS FOR LINES 73-87 **

    // (if search input CAN be found, ...)
    // ~~~~~~~~~~~~~
    // gets matching movies from value entered in search bar
    let response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${query.toLowerCase()}&page=${page}&include_adult=true`)
    let responseData = await response.json()
    
    // displays search results
    for (let i=0; i < responseData.results.length; i++) {
        displayResults(responseData.results[i])
    }

    // hides/unhides display text
    h1_nowPlaying.hidden = true
    h1_searchResults.hidden = false

    // changes display text to include the search value entered 
    h1_searchResults.innerHTML += `Showing results for: ${query}:`
    // ~~~~~~~~~~~~~

    // if statement #2 (if search input CANNOT be found, ...)
    // ~~~~~~~~~~~~~
    // start here

}

// -----------------------------------------
// ADDING MOVIES TO PAGE FUNCTION

function displayResults(movieData) {

    // creates new div inside existing empty div, then displays movie info on page
    movies_grid.innerHTML += `
        <div  class= "movie-cards">
            <img  class= "movie-poster"  title= "${movieData.original_title}"  src= "http://image.tmdb.org/t/p/w500${movieData.poster_path}"
            
            <div  id= "movie-info">
                <br>

                <p1  class= "movie-title"> ${movieData.original_title} </p1>

                <br><br>

                <p2  class= "movie-release-date"> Released Date: </p2>
                <p3> ${movieData.release_date} </p3>

                <br>

                <p2  class= "movie-votes"> Rating: </p2>
                <p3>  ${movieData.vote_average}/10  <img  alt= "star"  src= "images/star.png"> </p3>
                
                <br><br>
            </div>

        </div> `

}

// -----------------------------------------
// **UNFINISHED** LOAD MORE MOVIES EVENT LISTENER
// function currently re-adds the movies already on the page

load_more_movies_btn.addEventListener("click", () => {

    // goes to next page on "now playing" page 
    page += 1

    // calls function to display "now playing" page
    nowPlaying()

})

// -----------------------------------------
// ONLOAD FUNCTION 

window.onload = function() {

    // calls function to load immediately as the website loads
    nowPlaying()

}