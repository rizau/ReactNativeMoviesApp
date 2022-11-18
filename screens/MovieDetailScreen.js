import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import MovieDetail from "../components/MovieDetail";
import { MoviesContext } from "../context/moviesContext";
import { fetchMovieDetail } from "../util/http";

export default function MovieDetailScreen({ route }) {
  const moviesCtx = useContext(MoviesContext);
  const movies = moviesCtx.movies;
  const imdbID = route.params.imdbID;

  const [movie, setMovie] = useState(false);
  useLayoutEffect(() => {
    const getData = async () => {
      const filteredMovies = movies.filter((m) => m.imdbID == imdbID);
      if (filteredMovies.length > 0) {
        setMovie(filteredMovies[0]);
      
      } else {
        const fmovie = await fetchMovieDetail(imdbID);
        moviesCtx.addMovie(fmovie);
        setMovie(fmovie);
      
      }
    };
    getData();
  }, []);

  if (!movie)
    return (
      <SafeAreaView>
        <Text>Loading....</Text>
      </SafeAreaView>
    );

  return <SafeAreaView>{movie && <MovieDetail movie={movie} />}</SafeAreaView>;
}
