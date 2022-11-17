import { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import MovieDetail from "../components/MovieDetail";
import { MoviesContext } from "../context/moviesContext";
import { fetchMovieDetail } from "../util/http";
export default function MovieDetailScreen({ route }) {
  const moviesCtx = useContext(MoviesContext);
  const movies = moviesCtx.movies;
  const imdbID = route.params.imdbID;
  const filteredMovies = movies.filter((m) => m.imdbID == imdbID);
  const [movie, setMovie] = useState(false);
  useEffect(() => {
    const getData = async () => {
      if (filteredMovies.length > 0) {
        setMovie(filteredMovies[0]);
        console.log("show from cache");
      } else {
        const fmovie = await fetchMovieDetail(imdbID);
        moviesCtx.addMovie(fmovie);
        setMovie(fmovie);
        console.log("show from api");
      }
    };
    getData();
  }, []);

  const movieProps = {
    Title: movie.Title,
    Poster: movie.Poster,
    Actors: movie.Actors,
    Awards: movie.Awards,
    Plot: movie.Plot,
    Year: movie.Year,
    Genre: movie.Genre,
    Director: movie.Director,
    Ratings: movie.Ratings,
  };
  return <SafeAreaView>{movie && <MovieDetail {...movieProps} />}</SafeAreaView>;
}
