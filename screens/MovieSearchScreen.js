import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Pressable, TouchableOpacity, SafeAreaView } from "react-native";
import { DUMMY_MOVIES_RESPONSE } from "../data/movies";
import MovieItem from "../components/MovieItem";
export default function MovieSearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(searchText);
    const getMovies = setTimeout(async () => {
      console.log(searchText.length);
      if (searchText.length == 0) {
        console.log("movies reset");
        setMovies([]);
      } else {
        const movies = DUMMY_MOVIES_RESPONSE.Search;
        setMovies(movies);
        console.log("movies updated");
      }
    }, 2000);
    console.log(movies);
    return () => {
      clearTimeout(getMovies);
    };
  }, [searchText]);

  const searchChangeHandler = (enteredText) => {
    setSearchText(enteredText);
  };

  const renderMovieItem = (itemData) => {
    const item = itemData.item;
    // console.log(item);
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
      <TextInput style={styles.input} value={searchText} onChangeText={searchChangeHandler} />
      <FlatList data={movies} keyExtractor={(item) => item.imdbID} renderItem={renderMovieItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: { padding: 12,borderRadius:12, borderColor: "orange", borderWidth: 1, marginVertical: 16, marginHorizontal: 12 },
});
