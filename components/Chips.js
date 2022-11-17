import { Text, View, StyleSheet } from "react-native";
export default function Chips({ items, direction = "row" }) {
  return (
    <View style={[styles.container, { flexDirection: direction }]}>
      {items.map((item) => (
        <Text key={item} style={styles.text}>
          {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 2 },
  text: { borderRadius: 4, borderWidth: 1, padding: 2, margin: 2, fontSize: 12, borderColor: "orange" },
});
