import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "../../../types/movies";

export type TStorageKey = 'movies-hero' | 'movies-popular'
interface IFetchProps {
  path: string,
  key: TStorageKey,
}
interface IFetchResult {
  key: TStorageKey,
  result: IMovie[]
}

export const getOrFetchMovies = createAsyncThunk(
  'movies/getOrFetchMovies',
  async ({path, key}: IFetchProps, {rejectWithValue}) => {
    const storage = localStorage.getItem(key);  
    if (storage) {
      return {key, result: JSON.parse(storage)}
    } 
    try {
      const response = await fetch(`/api/tmdb?path=${path}&language=en-EN`);
      if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
      }

      const result = await response.json();
      return {key, result: result.results}

    } catch (err: any) {
        console.error("Error fetching data:", err);
        return rejectWithValue(err.response.data)
    }
  }

)

interface IState {
  hero: IMovie[],
  popular: IMovie[],
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | null | undefined;
}

const initialState: IState = {
    hero: [],
    popular: [],
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
        state.hero = action.payload.result;
      }
      if (action.payload.key === "movies-popular") {
        state.popular = action.payload.result;
      }
      localStorage.setItem(action.payload.key, JSON.stringify(action.payload.result))
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
