import { db } from "@/app/firebase";
import { IMovie } from "@/types/movies";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

export const fetchMovieWithId = createAsyncThunk(
  'movies/fetchMovieWithId',
  async ({id, type} : {id: string, type: 'tv' | 'movie'}, {rejectWithValue}) => {
    const ON_STORAGE_DAYS = 100;

    try {

      const storage = localStorage.getItem('movie');
      if (storage) {
        const movie = JSON.parse(storage) as IMovie; 
        
        if (id === String(movie.id)) {
          return movie; // 1 - storage
        }
      } 
      const docRef = doc(db, `${type}-id`, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const {movie, lastUpload} = docSnap.data() as {
          movie: IMovie, 
          lastUpload: string
        };  
        const lastUploadDate = new Date(lastUpload);
        const now = new Date();
        const daysDiff = (now.getTime() - lastUploadDate.getTime()) / 86400000;
        
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