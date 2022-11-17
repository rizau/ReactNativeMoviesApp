import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Pressable, TouchableOpacity, SafeAreaView } from "react-native";
import { DUMMY_MOVIES_RESPONSE } from "../data/movies";
import MovieItem from "../components/MovieItem";
import { fetchMovies } from "../util/http";
export default function MovieSearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
   
    const getMovies = setTimeout(async () => {
      if (searchText.length == 0) {
        setMovies([]);
      } else {
        const response = await fetchMovies(searchText); //DUMMY_MOVIES_RESPONSE.Search;
        const movies = response.Search ?? [];
        setMovies(movies);
      }
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
  return (
    <SafeAreaView>
      <TextInput style={styles.input} value={searchText} onChangeText={searchChangeHandler} placeholder="Search"/>
      <FlatList data={movies} keyExtractor={(item) => item.imdbID} renderItem={renderMovieItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { padding: 12, borderRadius: 12, borderColor: "orange", borderWidth: 1, marginVertical: 16, marginHorizontal: 12 },
});
