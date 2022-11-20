import { useEffect, useState } from "react";
import { TextInput, FlatList, StyleSheet, SafeAreaView, Text, RefreshControl } from "react-native";
import MovieItem from "../components/MovieItem";
import { fetchMovies } from "../util/http";
import LoadingFooter from "../components/LoadingFooter";
import * as Progress from "react-native-progress";

export default function MovieSearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const getMovies = setTimeout(async () => {
      setMovies([]);
      setIsLoading(true);

      const response = await fetchMovies(searchText, page);
      const movies = response.Search ?? [];

      setMovies(movies);
      setTotalResults(response.totalResults ?? 0);
      setIsLoading(false);
    }, 1000);
    return () => {
      clearTimeout(getMovies);
    };
  }, [searchText]);

  const searchChangeHandler = (enteredText) => {
    setSearchText(enteredText);
    setPage(1);
  };

  const renderMovieItem = (itemData) => {
    const item = itemData.item;
    const itemProps = {
      Title: item.Title,
      imdbID: item.imdbID,
      Poster: item.Poster,
      Type: item.Type,
      Year: item.Year,
    };
    return <MovieItem {...itemProps} />;
  };
  const onEndReachedHandler = () => {
    const totalPage = Math.ceil(totalResults / 10);
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    const getMoreMovies = async () => {
      setIsLoading(true);
      const request = await fetchMovies(searchText, page);
      const movies = request.Search ?? [];
      if (movies)
        setMovies((prevMovies) => {
          return [...prevMovies, ...movies];
        });

      setIsLoading(false);
      setIsRefreshing(false);
    };

    if (page > 1) getMoreMovies();
  }, [page]);

  const refreshMoviesHandler = async () => {
    setIsRefreshing(true);
    setPage(1);
    const request = await fetchMovies(searchText);
    const movies = request.Search ?? [];
    setMovies(movies);
    setIsRefreshing(false);
  };
  return (
    <>
      {(isLoading || isRefreshing) && <Progress.Bar color="green" borderRadius={0} indeterminate={true} width={null} />}
      <SafeAreaView>
        <TextInput style={styles.input} value={searchText} onChangeText={searchChangeHandler} placeholder="Search Movies..." />

        <FlatList data={movies} keyExtractor={(item) => item.imdbID} renderItem={renderMovieItem} onEndReached={onEndReachedHandler} ListFooterComponent={<LoadingFooter isLoading={isLoading} />} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshMoviesHandler} />} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  input: { padding: 12, borderRadius: 12, borderColor: "orange", borderWidth: 1, marginVertical: 16, marginHorizontal: 12 },
});
