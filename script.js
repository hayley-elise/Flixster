// -----------------------------------------
// global variables/constants

const api_key = "29ad49e172fb431f874b79cbe0ae49de"
// DOM elements
let h1_nowPlaying = document.getElementById("H1-nowPlaying")
let search_Bar = document.getElementById("Search-Bar")
let search_Button = document.getElementById("Search-Button")
let movie_Grid = document.getElementById("movie-grid")
let more_Results = document.getElementById("more-results")
let load_More_Button = document.getElementById("load-More")
// others
let page = 1

// -----------------------------------------
// now playing movie list

async function nowPlaying() {
    h1_nowPlaying.hidden = false
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=`)
    const responseData = await response.json()
    
    for (let i=0; i < responseData.results.length; i++) {
        displayResults(responseData.results[i])
    }
}

// -----------------------------------------
// submitting search results

search_Bar.addEventListener("submit", (event) => {
    event.preventDefault()

    movie_Grid.innerHTML = ""
    let result = search_Bar.value
    movieResults(result)

    h1_nowPlaying.innerHTML = "Showing results for " + result + ":"
})

// -----------------------------------------
// getting search results

async function movieResults(event) {
    event.preventDefault()

    let response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${search_Bar.value}&page=${page}&include_adult=false`)
    let responseData = await response.json()
    
    for (let i=0; i < responseData.results.length; i++) {
        displayResults(responseData.results[i])
    }
}

// -----------------------------------------
// displaying search results

function displayResults(movieData) {
    movie_Grid.innerHTML += `
        <div id="movie-card">
            <img id="movie-poster" src="http://image.tmdb.org/t/p/w500${movieData.poster_path}"
            <div id="movie-info">
                <p1 id="movie-title"> ${movieData.original_title} </p1>
                <br><br>
                <p2 id="movie-release-date"> Released Date: </p2> <p3> ${movieData.release_date} </p3>
                <br><br>
                <p2 id="movie-votes"> Rating: </p2> <p3> ${movieData.vote_average}/10 <img id="star" src="images/star.png" alt="star"> </p3>
                <br><br>
            </div>
        </div> ` 
}

// -----------------------------------------
// load more movies

load_More_Button.addEventListener("click", () => {
    page++
    nowPlaying()
})

// -----------------------------------------
// onload function

window.onload = function() {
    nowPlaying()
}