import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { IMovie } from "../../../types/movies";

export type TStorageKey = 
| 'movies-hero' 
| 'movies-popular' 
| 'movies-watching' 
| 'movies-upcoming' 
| 'movies-series' 
| 'movie';

interface IFetchProps {
  path: string,
  key: TStorageKey,
}
interface IFetchResult {
  key: TStorageKey,
  movies: IMovie[],
  lastUpdated: string,
}

export const getOrFetchMovies = createAsyncThunk(
  'movies/getOrFetchMovies',
  async ({path, key}: IFetchProps, {rejectWithValue}) => {
    const CACHE_HOURS = 8;
    const ON_STORAGE_DAYS = 7;

    try {
        const storage = localStorage.getItem(key);
        if (storage) {
          const { movies, lastUpdated } = JSON.parse(storage) as {
            movies: IMovie[], 
            lastUpdated: string
          }; 
          const lastUpdatedDate = new Date(lastUpdated);
          const now = new Date();
          const hoursDiff = (now.getTime() - lastUpdatedDate.getTime()) / 1000 / 60 / 60;
  
          if (hoursDiff < CACHE_HOURS) { 
            return { key, movies, lastUpdated}; // 1 - storage
          }
        } 

      const docRef = doc(db, "movies", key);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const {movies, lastUpdated} = docSnap.data() as {
          movies: IMovie[], 
          lastUpdated: string
        };  
        const lastUpdatedDate = new Date(lastUpdated);
        const now = new Date();

        const hoursDiff = (now.getTime() - lastUpdatedDate.getTime()) / 1000 / 60 / 60;
        const daysDiff = (now.getTime() - lastUpdatedDate.getTime()) / 1000 / 60 / 60 / 24;

        if (movies.length > 0) {
          if (hoursDiff < CACHE_HOURS) {
            return { key, movies, lastUpdated}; // 2 - db firebase
          }
        }

        if (daysDiff >= ON_STORAGE_DAYS) {
          await deleteDoc(docRef);
        }
        
      }
      const response = await fetch(`/api/tmdb?path=${path}&language=en-US`);
      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      const resultData = {
        movies: result.results,
        lastUpdated: new Date().toISOString(),
      };
      await setDoc(docRef, resultData); 
      return { key, movies: result.results, lastUpdated: new Date().toISOString()}; // 3 - tmdb api

    } catch (err: any) {
        console.error("Error fetching data:", err);
        return rejectWithValue(err.response.data) 
    }
  }

)


export const fetchMovieWithId = createAsyncThunk(
  'movies/fetchMovieWithId',
  async ({id, type} : {id: string, type: 'tv' | 'movie'}, {rejectWithValue}) => {
    const ON_STORAGE_DAYS = 100;

    try {
      const docRef = doc(db, `${type}-id`, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const {movie, lastUpload} = docSnap.data() as {
          movie: IMovie, 
          lastUpload: string
        };  
        const lastUploadDate = new Date(lastUpload);
        const now = new Date();
        const daysDiff = (now.getTime() - lastUploadDate.getTime()) / 86400000  // 86400000 = 1000 / 60 / 60 / 24;
        
        if (movie && daysDiff < ON_STORAGE_DAYS) {
          return movie
        } else {
          await deleteDoc(docRef);
        }
      }
      const response = await fetch(`/api/tmdb?path=${type}/${id}&append_to_response=videos&language=en-US`);
      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json() as IMovie;

      const saveData = {movie: result, lastUpload: new Date().toISOString()};
      await setDoc(docRef, saveData); 
      return result; // 3 - tmdb api

    } catch (err: any) {
        console.error("Error fetching data:", err);
        return rejectWithValue(err.response.data) 
    } 
  }

)

type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';
type TError = string | null | undefined;
interface IState {
  hero: IMovie[],
  popular: IMovie[],
  watching: IMovie[],
  series: IMovie[],
  upcoming: IMovie[],
  movie: {
    movie: IMovie | {},
    loading: TLoading,
    error: TError,
  },
  loading: TLoading,
  error: TError;
}

const initialState: IState = {
    hero: [],
    popular: [],
    watching: [],
    series: [],
    upcoming: [],
    movie: {
      movie: {},
      loading: 'idle',
      error: null,
    },
    loading: 'idle',
    error: null
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
    },
    setMovie: (state, action: PayloadAction<IMovie | {}>) => {      
      state.movie.movie = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrFetchMovies.pending, (state) => {
      state.loading = 'pending';
    })
    .addCase(getOrFetchMovies.fulfilled, (state, action: PayloadAction<IFetchResult>) => {
      if (action.payload.key === "movies-hero") {
        state.hero = action.payload.movies;
      }
      if (action.payload.key === "movies-popular") {
        state.popular = action.payload.movies;
      }
      if (action.payload.key === "movies-watching") {
        state.watching = action.payload.movies;
      }
      if (action.payload.key === "movies-upcoming") {
        state.upcoming = action.payload.movies;
      }
      if (action.payload.key === "movies-series") {
        state.series = action.payload.movies;
      }
      localStorage.setItem(action.payload.key, JSON.stringify({ 
        movies: action.payload.movies, 
        lastUpdated: action.payload.lastUpdated 
      }))
      state.loading = 'succeeded';
    })
    .addCase(getOrFetchMovies.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message
    })

    .addCase(fetchMovieWithId.pending, (state) => {
      state.movie.loading = 'pending';
    })
    .addCase(fetchMovieWithId.fulfilled, (state, action: PayloadAction<IMovie>) => {
      state.movie.movie = action.payload;
      state.movie.loading = 'succeeded';
    })
    .addCase(fetchMovieWithId.rejected, (state, action) => {
      state.movie.loading = 'failed';
      state.movie.error = action.error.message
    })
  },
});

export const { setMoviesHero, setMoviesPopular, setMovie} = moviesSlice.actions;
export default moviesSlice.reducer;
