import { db } from "@/app/firebase";
import { IMovie } from "@/types/movies";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { TMovieStorageKey } from "../../slices/moviesSlice";

interface IFetchProps {
  path: string,
  key: TMovieStorageKey,
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