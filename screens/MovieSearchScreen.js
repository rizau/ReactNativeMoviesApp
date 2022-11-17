import { useEffect, useState } from "react";
import { TextInput, FlatList, StyleSheet, SafeAreaView, View, ActivityIndicator, Text, RefreshControl } from "react-native";
import MovieItem from "../components/MovieItem";
import { fetchMovies } from "../util/http";
export default function MovieSearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const getMovies = setTimeout(async () => {
      // if (searchText.length == 0) {
      setMovies([]);
      setIsLoading(true);
      //} else {
      setPage(1);
      const response = await fetchMovies(searchText); //DUMMY_MOVIES_RESPONSE.Search;
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
  const getMoreMovies = () => {
    if (page < Math.ceil(totalResults / 10)) {
      setIsLoading(true);
      setPage(page + 1);
    }
  };
  useEffect(() => {
    const getMore = async () => {
      const request = await fetchMovies(searchText, page);
      const movies = request.Search ?? [];
      if (request.Response)
        setMovies((prevMovies) => {
          if (page == 1) return setMovies(movies);
          return [...prevMovies, ...movies];
        });

      // setIsLoading(false);
    };
    if (page <= Math.ceil(totalResults / 10)) {
      getMore();
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [page]);
  const loadingFooter = () => {
    return (
      isLoading && (
        <View style={{ marginVertical: 100 }}>
          <ActivityIndicator animating size="large" />
        </View>
      )
    );
  };
  const refreshMoviesHandler = () => setPage(1);
  return (
    <SafeAreaView>
      <Text>
        {page}-{totalResults}
      </Text>
      <TextInput style={styles.input} value={searchText} onChangeText={searchChangeHandler} placeholder="Search" />
      <FlatList data={movies} keyExtractor={(item) => item.imdbID} renderItem={renderMovieItem} onEndReached={getMoreMovies} ListFooterComponent={loadingFooter} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refreshMoviesHandler} />} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { padding: 12, borderRadius: 12, borderColor: "orange", borderWidth: 1, marginVertical: 16, marginHorizontal: 12 },
});
