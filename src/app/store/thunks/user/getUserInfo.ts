import { db } from "@/app/firebase";
import { IUser } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (id: string, {rejectWithValue}) => {
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const user = docSnap.data() as IUser;  
        return user; 
      }

    } catch (err: any) {
        console.error("Error fetching user data:", err);
        return rejectWithValue(err.response.data) 
    } 
  }

)