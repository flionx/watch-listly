import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux';
import { getOrFetchMovies } from '@/app/store/slices/moviesSlice';
import { TSetState } from '@/types/global';
const useManageHero = () => {
    const [selectMovie, setSelectMovie] = useState(0);
    const callSetSelectMovie = useCallback<TSetState<number>>((value) => setSelectMovie(value), [])
    
    const movies = useAppSelector(state => state.movies.hero)
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOrFetchMovies({path: 'trending/all/day', key: 'movies-hero'}))
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
    
    return { movies, selectMovie, setSelectMovie: callSetSelectMovie, heroRef, listRef}
}

export default useManageHero