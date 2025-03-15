import { useState, useEffect } from 'react'
import { useAppDispatch } from './useRedux';
import { setMoviesHero } from '../store/slices/moviesSlice';

const useFetchTMDB = (
    path: string, 
    type: 'movies-hero',
) => {
    const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
        try {
            setLoading(true);
            const response = await fetch(`/api/tmdb?path=${path}&language=en-EN`);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            
            const result = await response.json();            
            if (type === 'movies-hero') {
                dispatch(setMoviesHero(result.results));
            }
        } catch (err: any) {
            setError(err.message);
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    }
    
    fetchMovies();
  }, [path]);

  return { loading, error };
}

export default useFetchTMDB