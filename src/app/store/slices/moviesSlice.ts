import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { IMovie } from "../../../types/movies";

export type TStorageKey = 'movies-hero' | 'movies-popular' | 'movies-watching' | 'movies-upcoming'
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
      const response = await fetch(`/api/tmdb?path=${path}&language=en-EN`);
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

interface IState {
  hero: IMovie[],
  popular: IMovie[],
  watching: IMovie[],
  upcoming: IMovie[],
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | null | undefined;
}

const initialState: IState = {
    hero: [],
    popular: [],
    watching: [],
    upcoming: [],
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
    }
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
      localStorage.setItem(action.payload.key, JSON.stringify({ 
        movies: action.payload.movies, 
        lastUpdated: action.payload.lastUpdated 
      }))
      state.loading = 'succeeded';
    })
    .addCase(getOrFetchMovies.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error.message
    });
  },
});

export const { setMoviesHero, setMoviesPopular} = moviesSlice.actions;
export default moviesSlice.reducer;
