import { SafeAreaView } from "react-native";
import MovieDetail from "../components/MovieDetail";
import { DUMMY_MOVIE_DETAIL_RESPONSE } from "../data/movies";
export default function MovieDetailScreen() {
  const movie = DUMMY_MOVIE_DETAIL_RESPONSE;

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
  return (
    <SafeAreaView>
      <MovieDetail {...movieProps} />
    </SafeAreaView>
  );
}
