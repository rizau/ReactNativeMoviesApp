import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
export default function MovieItem({ Title, imdbID, Poster, Year }) {
  const navigation = useNavigation();
  const moviePressHandler = () => {
    navigation.navigate("movieDetail", { imdbID: imdbID });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.movieContainer} onPress={moviePressHandler}>
        <Image style={styles.poster} source={{ uri: Poster != "N/A" ? Poster : null }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {Title} ( {Year} )
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { paddingVertical: 4, width: "100%", height: 100 },
  movieContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 12,
    backgroundColor: "orange",
    borderRadius: 12,
  },
  titleContainer: { flex: 1, flexDirection: "column", margin: 4, justifyContent: "center" },
  title: { fontSize: 14, fontWeight: "bold" },
  poster: { height: "100%", width: "40%", borderBottomLeftRadius: 12, borderTopLeftRadius: 12 },
});
