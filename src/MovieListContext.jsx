import { createContext, useState } from "react";

export const MovieListContext = createContext();

export function MovieListProvider({ children }) {
  const [myList, setMyList] = useState([]);

  const addToMyList = (movie) => {
    setMyList((prevList) => [...prevList, movie]);
  };

  const removeFromMyList = (movieId) => {
    setMyList((prevList) => prevList.filter((movie) => movie.id !== movieId));
  };

  return (
    <MovieListContext.Provider value={{ myList, addToMyList, removeFromMyList }}>
      {children}
    </MovieListContext.Provider>
  );
}
