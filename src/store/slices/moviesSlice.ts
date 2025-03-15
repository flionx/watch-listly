import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../types/movies";

interface IState {
    hero: IMovie[],
}

const getInitialHero = (): IMovie[] => {
  const storage = localStorage.getItem("movies-hero");  
  return storage ? JSON.parse(storage) : [];
};

const initialState: IState = {
    hero: getInitialHero(),
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoviesHero: (state, action: PayloadAction<IMovie[]>) => {      
      state.hero = action.payload;
      localStorage.setItem('movies-hero', JSON.stringify(state.hero))
    }
  },
});

export const { setMoviesHero } = moviesSlice.actions;
export default moviesSlice.reducer;
