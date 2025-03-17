import { useAppDispatch } from "./useRedux";
import { setMoviesHero, setMoviesPopular } from "../store/slices/moviesSlice";
import { TStorageKey } from "./useCheckStorage";
import { TSetState } from "@/types/global";

const useFetchTMDB = () => {
    const dispatch = useAppDispatch();

    const fetchTMDB = async (path: string, type: TStorageKey, setFetched: TSetState<boolean>) => {
        try {
            const response = await fetch(`/api/tmdb?path=${path}&language=en-EN`);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
    
            const result = await response.json();
            
            if (type === "movies-hero") {
                dispatch(setMoviesHero(result.results));
            }
            if (type === "movies-popular") {
                dispatch(setMoviesPopular(result.results));
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setFetched(false);
        }
    };
    return {fetchTMDB};
}

export default useFetchTMDB;
