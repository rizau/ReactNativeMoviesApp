import { useEffect, useState } from "react";
import { TextInput, FlatList, StyleSheet, SafeAreaView, Text, RefreshControl } from "react-native";
import MovieItem from "../components/MovieItem";
import { fetchMovies } from "../util/http";
import LoadingFooter from "../components/LoadingFooter";
export default function MovieSearchScreen() {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const testF = async () => {
    const response = await fetchMovies(searchText, page);
    const movies = response.Search ?? [];
    return movies;
  };

  useEffect(() => {
    const getMovies = setTimeout(async () => {
      // if (searchText.length == 0) {
      setMovies([]);
      setIsLoading(true);
      //} else {
      //setPage(1);
      const response = await fetchMovies(searchText, page);
      const movies = response.Search ?? [];
      setMovies(movies);
      setTotalResults(response.totalResults);
      setIsLoading(false);
      //}
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
      if (request.Response)
        setMovies((prevMovies) => {
          if (page == 1) return setMovies(movies);
          return [...prevMovies, ...movies];
        });

      setIsLoading(false);
      setIsRefreshing(false);
    };
    // if (page <= Math.ceil(totalResults / 10)) {
    getMoreMovies();
    console.log(page);
    // setTimeout(() => {
    // setIsLoading(false);
    //setIsRefreshing(false);
    //}, 1000);
    //}
  }, [page]);

  const refreshMoviesHandler = async () => {
    setIsRefreshing(true);
    setPage(1);
    const movies = await testF();
    setMovies(movies);
    setIsRefreshing(false);
  };
  return (
    <SafeAreaView>
      <Text>{totalResults}</Text>
      <TextInput style={styles.input} value={searchText} onChangeText={searchChangeHandler} placeholder="Search" />
      {/**searchText.length > 0 && !isLoading && !totalResults && <Text style={{ textAlign: "center" }}>No Movies found...</Text>*/}
      <FlatList data={movies} keyExtractor={(item) => item.imdbID} renderItem={renderMovieItem} onEndReached={onEndReachedHandler} ListFooterComponent={<LoadingFooter isLoading={isLoading} />} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refreshMoviesHandler} />} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { padding: 12, borderRadius: 12, borderColor: "orange", borderWidth: 1, marginVertical: 16, marginHorizontal: 12 },
});
