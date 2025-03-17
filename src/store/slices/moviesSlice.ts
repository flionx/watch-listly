import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types/movies";

interface IState {
    hero: IMovie[],
    popular: IMovie[],
}

const getInitialHero = (): IMovie[] => {
  const storage = localStorage.getItem("movies-hero");  
  return storage ? JSON.parse(storage) : [];
};
const getInitialPopular = (): IMovie[] => {
  const storage = localStorage.getItem("movies-popular");  
  return storage ? JSON.parse(storage) : [];
};

const initialState: IState = {
    hero: getInitialHero(),
    popular: getInitialPopular(),
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesHero: (state, action: PayloadAction<IMovie[]>) => {      
      state.hero = action.payload;
      localStorage.setItem('movies-hero', JSON.stringify(state.hero))
    },
    setMoviesPopular: (state, action: PayloadAction<IMovie[]>) => {      
      state.popular = action.payload;
      localStorage.setItem('movies-popular', JSON.stringify(state.popular))
    }
  },
});

export const { setMoviesHero, setMoviesPopular } = moviesSlice.actions;
export default moviesSlice.reducer;
