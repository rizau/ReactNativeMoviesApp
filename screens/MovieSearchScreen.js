import { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, Pressable } from "react-native";
import { DUMMY_MOVIES_RESPONSE } from "../data/movies";
export default function MovieSearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    console.log(searchText);
    const getMovies = setTimeout(async () => {
      if (searchText.length == 0) {
        setMovies([]);
      } else {
        const movies = await DUMMY_MOVIES_RESPONSE.Search;
        setMovies(movies);
        console.log("movies updated");
      }
    }, 2000);

    return () => {
      clearTimeout(getMovies);
    };
  }, [searchText]);

  const searchChangeHandler = (enteredText) => {
    setSearchText(enteredText);
  };

  const MovieItem = (itemData) => {
    return (
      <View>
        <Pressable onPress={() => navigation.navigate("movieDetail")}>
          <Text>{itemData.item.Title}</Text>
        </Pressable>
      </View>
    );
  };
  return (
    <View>
      <TextInput style={styles.input} value={searchText} onChangeText={searchChangeHandler} />
      <FlatList data={movies} keyExtractor={(item) => item.imdbID} renderItem={MovieItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { padding: 4, borderColor: "orange", borderWidth: 3, marginVertical: 16, marginHorizontal: 24 },
});
