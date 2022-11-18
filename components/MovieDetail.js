import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Chips from "./Chips";

export default function MovieDetail(props) {
  const { Title, Poster, Year, Genre, Ratings } = props.movie;

  const subTitleList = ["Actors", "Director", "Awards", "Plot"];
  const genres = Genre.split(",");
  console.log("detail", props.movie);
  return (
    <ScrollView>
      <Image style={styles.img} source={{ uri: Poster != "N/A" ? Poster : null }} />
      <View style={styles.subtitleContainer}>
        <Text style={styles.title}>{Title}</Text>
      </View>

      {subTitleList.map((subtitle) => (
        <View key={subtitle} style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <Text>{props.movie[subtitle]}</Text>
        </View>
      ))}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Ratings</Text>
        {Ratings.map((item) => (
          <View key={item.Source} style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{item.Source}</Text>
            <Text>{item.Value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontWeight: "bold", marginTop: 12 },
  img: { height: 250, width: "100%", marginTop: 12, borderRadius: 12 },
  subtitleContainer: { borderBottomColor: "orange", borderBottomWidth: 2, padding: 4, marginHorizontal: 24 },
  subtitle: { fontWeight: "bold" },
  details: { flexDirection: "row", padding: 8, alignItems: "center", justifyContent: "center" },
  detailItem: { marginHorizontal: 6 },
});
