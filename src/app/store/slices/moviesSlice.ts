import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrFetchMovies } from "../thunks/movies/getOrFetchMovies";
import { fetchMovieWithId } from "../thunks/movies/fetchMovie";
import { IMovie } from "../../../types/movies";
import { TLoading } from "@/types/global";

export type TMovieStorageKey = 
| 'movies-hero' 
| 'movies-popular' 
| 'movies-watching' 
| 'movies-upcoming' 
| 'movies-series' 
| 'movie';

interface IFetchResult {
  key: TMovieStorageKey,
  movies: IMovie[],
  lastUpdated: string,
}

export type TMovieStateKeys = 'hero' | 'popular' | 'watching' | 'series' | 'upcoming';
type TError = string | null | undefined;

interface IMoviesState {
    movies: IMovie[],
    loading: TLoading,
    error: TError,
}
interface IMovieState {
    movie: IMovie | {},
    loading: TLoading,
    error: TError,
}

interface IState {
  hero: IMoviesState,
  popular: IMoviesState,
  watching: IMoviesState,
  series: IMoviesState,
  upcoming: IMoviesState,
  movie: IMovieState,
  error: TError;
}

const setBasicState = (type = null): IMoviesState => ({
  movies: [],
  loading: 'idle',
  error: null
})

const initialState: IState = {
    hero: setBasicState(),
    popular: setBasicState(),
    watching: setBasicState(),
    series: setBasicState(),
    upcoming: setBasicState(),
    movie: {
      movie: {},
      loading: 'idle',
      error: null,
    },
    error: null
}

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovie: (state, action: PayloadAction<IMovie | {}>) => {      
      state.movie.movie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrFetchMovies.pending, (state, action) => {
      //'movies-hero' to 'hero' 
      const stateKey = action.meta.arg.key.replace('movies-', '') as TMovieStateKeys;  
      state[stateKey].loading = 'pending';
    })
    .addCase(getOrFetchMovies.fulfilled, (state, action: PayloadAction<IFetchResult>) => {
      const stateKey = action.payload.key.replace('movies-', '') as TMovieStateKeys;        
      state[stateKey].movies = action.payload.movies;
      state[stateKey].loading = 'succeeded';
      localStorage.setItem(action.payload.key, JSON.stringify({ 
        movies: action.payload.movies, 
        lastUpdated: action.payload.lastUpdated 
      }))
    })
    .addCase(getOrFetchMovies.rejected, (state, action) => {
      const stateKey = action.meta.arg.key.replace('movies-', '') as TMovieStateKeys;        
      state[stateKey].loading = 'failed';
      state.error = action.error.message
    })

    .addCase(fetchMovieWithId.pending, (state) => {
      state.movie.loading = 'pending';
    })
    .addCase(fetchMovieWithId.fulfilled, (state, action: PayloadAction<IMovie>) => {
      state.movie.movie = action.payload;
      state.movie.loading = 'succeeded';
      localStorage.setItem('movie', JSON.stringify(action.payload))
    })
    .addCase(fetchMovieWithId.rejected, (state, action) => {
      state.movie.loading = 'failed';
      state.movie.error = action.error.message
    })
  },
});

export const {setMovie} = moviesSlice.actions;
export default moviesSlice.reducer;
