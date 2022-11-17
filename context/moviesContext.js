import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";


export const MoviesContext = createContext({
  movies: [],
  addMovie: () => {},
});

function MoviesContextProvider({ children }) {
  useEffect(() => {
    const getCachedMovies = async () => {
      const cachedMovies = await AsyncStorage.getItem("movies");
      if (cachedMovies) {
        setMovies(JSON.parse(cachedMovies));
      }
    };
    getCachedMovies();
  }, []);

  const [movies, setMovies] = useState([]);
  const addMovie = (movie) => {
    setMovies((currentMovies) => [...currentMovies, movie]);
    AsyncStorage.setItem("movies", JSON.stringify(movies));
  };

  const value = {
    movies,
    addMovie,
  };
  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
}

export default MoviesContextProvider;
