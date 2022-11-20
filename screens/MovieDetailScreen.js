import { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import MovieDetail from "../components/MovieDetail";
import { MoviesContext } from "../context/moviesContext";
import { fetchMovieDetail } from "../util/http";
import * as Progress from "react-native-progress";

export default function MovieDetailScreen({ route, navigation }) {
  const moviesCtx = useContext(MoviesContext);
  const movies = moviesCtx.movies;
  const imdbID = route.params.imdbID;

  const [movie, setMovie] = useState(false);
  useLayoutEffect(() => {
    const getData = async () => {
      const filteredMovies = movies.filter((m) => m.imdbID == imdbID);
      let movieDetail;
      if (filteredMovies.length > 0) {
        movieDetail = filteredMovies[0];
      } else {
        movieDetail = await fetchMovieDetail(imdbID);
        moviesCtx.addMovie(movieDetail);
      }
      setMovie(movieDetail);
      navigation.setOptions({ title: movieDetail.Title });
    };
    getData();
  }, []);

  if (!movie) return <Progress.Bar color="green" borderRadius={0} indeterminate={true} width={null} />;

  return <SafeAreaView>{movie && <MovieDetail movie={movie} />}</SafeAreaView>;
}
