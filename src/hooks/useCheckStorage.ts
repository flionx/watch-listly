import { useEffect, useState } from "react";
import { IMovie } from "@/types/movies";
import useFetchTMDB from "./useFetchTMDB";

const useCheckStorage = (path: string, key: "movies-hero", movies: IMovie[]) => {
    const [fetched, setFetched] = useState(false);
    const {fetchTMDB}  = useFetchTMDB()
    useEffect(() => {
        if (movies.length === 0 && !fetched) {
            fetchTMDB(path, key);
            setFetched(true);
        }
    }, [movies, fetched, path, key]);
};

export default useCheckStorage;
