// Defining global variable API Key, base URL, language and button element
const tmdbKey = '471cc639eb02caccab3c76a7b8369fce';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const language = 'en-US'
const playBtn = document.getElementById('playBtn');

// Function to fetch genres array
const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}&language=${language}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

  try {
    // sending a request to the TMDB API with the url string above
    const response = await fetch(urlToFetch);
    // handling the successful promise response
    if(response.ok) {
      const jsonResponse = await response.json();
      genres = jsonResponse.genres;
      return genres;
    }
    // handling uncess if response is not ok
    throw new Error('Request to getGenres() has failed! WTF!!')

  } catch (error) {
    console.log(error);
  }
};

// Function to get movies from 
const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&language=${language}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    // sending a request to the TMDB API with the url string above
    const response = await fetch(urlToFetch);
    // handling the successful promise response
    if(response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
    // handling uncess if response is not ok
    throw new Error('Request to getMovies() has failed! WTF!!')
  } catch(error) {
    console.log(error);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}&language=${language}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
    // sending a request to the TMDB API with the url string above
    const response = await fetch(urlToFetch);
    // handling the successful promise response
    if(response.ok) {
      const jsonResponse = await response.json();
      const movieInfo = jsonResponse;
      return movieInfo;
    }
    // handling uncess if response is not ok
    throw new Error('Request to getMovieInfo() has failed! WTF!!')
  } catch(error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };

  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};


// keep this code in the end
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;