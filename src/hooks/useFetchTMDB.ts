import { useAppDispatch } from "./useRedux";
import { setMoviesHero } from "../store/slices/moviesSlice";

const useFetchTMDB = () => {
    const dispatch = useAppDispatch();

    const fetchTMDB = async (path: string, type: "movies-hero") => {
        try {
            const response = await fetch(`/api/tmdb?path=${path}&language=en-EN`);
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
    
            const result = await response.json();
            if (type === "movies-hero") {
                dispatch(setMoviesHero(result.results));
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };
    return {fetchTMDB};
}

export default useFetchTMDB;
