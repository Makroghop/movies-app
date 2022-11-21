const API_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMG_path = "https://image.tmdb.org/t/p/w1280";
const SEARCH_api =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector("main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");
//initial call
getMovies(API_url);

async function getMovies(url) {
  try {
    const resp = await fetch(url);
    const respData = await resp.json();
    // console.log(respData);
    //	respData.results.forEach((movie) => {
    //		const img = document.createElement('img');
    //		img.src = IMG_path + movie.poster_path;
    //		document.body.appendChild(img);
    showMovies(respData.results);
  } catch (er) {
    document.getElementById("er").style.display = "block";
    document.getElementById("main").style.marginTop = "0rem";
  }

  //return respData;
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;
    const movie_el = document.createElement("div");
    movie_el.classList.add("movie");
    movie_el.innerHTML = `
			<img src="${IMG_path + poster_path}" alt="${title}">
			<div class="movie-info">
				<h3>${title}</h3>
               
				<span class="${getClassByRate(vote_average)}">${vote_average}</span>
			</div>
               <div class="overview">
                <h3>Overview:</h3>
               <p> ${overview}</p>
            </div>
		`;
    main.appendChild(movie_el);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  }
  if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (p) => {
  p.preventDefault();
  const search_val = search.value;

  if (search_val) {
    document.getElementById("er").style.display = "none";
    document.getElementById("main").style.marginTop = "10rem";

    getMovies(SEARCH_api + search_val);
    search.value = "";
    window.scrollTo({ top: 0 });
  } else {
    document.getElementById("er").style.display = "block";
    document.getElementById("main").style.marginTop = "0rem";
  }
});
