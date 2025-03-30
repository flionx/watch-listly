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

export type TMovieStateKeys = 'hero' | 'popular' | 'watching' | 'series' | 'upcoming';
type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';
type TError = string | null | undefined;
interface IMoviesState {
    movies: IMovie[],
    loading: TLoading,
    error: TError,
}

interface IState {
  hero: IMoviesState,
  popular: IMoviesState,
  watching: IMoviesState,
  series: IMoviesState,
  upcoming: IMoviesState,
  movie: {
    movie: IMovie | {},
    loading: TLoading,
    error: TError,
  },
  error: TError;
}

const initialState: IState = {
    hero: {
      movies: [],
      loading: 'idle',
      error: null
    },
    popular: {
      movies: [],
      loading: 'idle',
      error: null
    },
    watching: {
      movies: [],
      loading: 'idle',
      error: null
    },
    series: {
      movies: [],
      loading: 'idle',
      error: null
    },
    upcoming: {
      movies: [],
      loading: 'idle',
      error: null
    },
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
      //'movies-hero' to 'hero' 
      const stateKey = action.payload.key.replace('movies-', '') as TMovieStateKeys;        
      state[stateKey].movies = action.payload.movies;
      state[stateKey].loading = 'succeeded';
      localStorage.setItem(action.payload.key, JSON.stringify({ 
        movies: action.payload.movies, 
        lastUpdated: action.payload.lastUpdated 
      }))
    })
    .addCase(getOrFetchMovies.rejected, (state, action) => {
      state.series.loading = 'failed'; //hererererere-----------------
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

export const {setMovie} = moviesSlice.actions;
export default moviesSlice.reducer;
