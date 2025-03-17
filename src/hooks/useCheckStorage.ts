import { useEffect, useState } from "react";
import { IMovie } from "@/types/movies";
import useFetchTMDB from "./useFetchTMDB";
export type TStorageKey = 'movies-hero' | 'movies-popular';

const useCheckStorage = (path: string, key: TStorageKey, movies: IMovie[]) => {
    const [fetched, setFetched] = useState(false);
    const {fetchTMDB}  = useFetchTMDB()
    useEffect(() => {
        if (movies.length === 0 && !fetched) {
            fetchTMDB(path, key, setFetched);            
            setFetched(true);
        }
    }, [movies, fetched, path, key]);
};

export default useCheckStorage;
