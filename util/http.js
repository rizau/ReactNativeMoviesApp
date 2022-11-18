import axios from "axios";

const API_URL = "http://www.omdbapi.com";
const API_KEY = "efde691a";

export async function fetchMovies(searhText, page = 1) {
  const url = `${API_URL}/?apikey=${API_KEY}&s=${searhText}&page=${page}`;
  const result = await getRequest(url);
  return result;
}

export async function fetchMovieDetail(imdbID) {
  const url = `${API_URL}/?apikey=${API_KEY}&i=${imdbID}`;
  const result = await getRequest(url);
  return result;
}

async function getRequest(url) {
  const response = await axios.get(url);
  const data = await response.data;
  return data;
}
