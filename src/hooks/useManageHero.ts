import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux';
import { getOrFetchMovies } from '@/app/store/thunks/movies/getOrFetchMovies';
import { TSetState } from '@/types/global';

const useManageHero = () => {
    const [selectMovie, setSelectMovie] = useState(0);
    const callSetSelectMovie = useCallback<TSetState<number>>((value) => setSelectMovie(value), [])
    const loading = useAppSelector(state => state.movies.hero.loading)
    const movies = useAppSelector(state => state.movies.hero.movies)
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOrFetchMovies({path: 'movie/popular', key: 'movies-hero'}))
    }, [])

    const heroRef = useRef<HTMLElement>(null)
    const listRef = useRef<HTMLDivElement >(null)

    const intervalId = useRef<NodeJS.Timeout>(null)
    useEffect(() => {
        intervalId.current = setInterval(() => {            
            setSelectMovie(curr => (movies.length - 1 > selectMovie) ? (curr + 1) : 0 )
        }, 5000);
    
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [selectMovie, movies]);
    
    return { movies, selectMovie, setSelectMovie: callSetSelectMovie, heroRef, listRef, loading}
}

export default useManageHero