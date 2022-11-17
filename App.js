import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MovieDetailScreen from "./screens/MovieDetailScreen";
import MovieSearchScreen from "./screens/MovieSearchScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="searchMovies" component={MovieSearchScreen} />
        <Stack.Screen name="movieDetail" component={MovieDetailScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
