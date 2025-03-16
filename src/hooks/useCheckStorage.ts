import { IMovie } from '@/types/movies';
import useFetchTMDB from './useFetchTMDB';

const useCheckStorage = (path: string, key: 'movies-hero', movies: IMovie[]) => {
    
    if (movies.length === 0) {
        useFetchTMDB(path, key);
    }

}

export default useCheckStorage