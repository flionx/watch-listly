import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux';
import { TStorageWideKey } from '@/components/WideListSection/WideListSection';
import { TMovieStateKeys } from '@/app/store/slices/moviesSlice';
import { getOrFetchMovies } from '@/app/store/thunks/movies/getOrFetchMovies';

const useMoviesWide = (path: string, storageKey: TStorageWideKey) => {
    const stateKey = storageKey.replace('movies-', '') as TMovieStateKeys;        

    const dispatch = useAppDispatch();  
    const loading = useAppSelector(state => state.movies[stateKey].loading ?? 'idle')  
    const movies =  useAppSelector(state => state.movies[stateKey].movies ?? []);    
    useEffect(() => {
        dispatch(getOrFetchMovies({path, key: storageKey}))
    }, [])
    const listRef = useRef<HTMLDivElement>(null)

    return {loading, movies, listRef}
}

export default useMoviesWide