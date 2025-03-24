import { useCallback, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux';
import { getOrFetchMovies } from '@/app/store/slices/moviesSlice';
import { TSetState } from '@/types/global';
import useSpinStep from './useSpinStep';
import { smallCardWith } from '@/app/constants/movies';

const useManageHero = () => {
    const [selectMovie, setSelectMovie] = useState(0);
    const callSetSelectMovie = useCallback<TSetState<number>>((value) => setSelectMovie(value), [])
    
    const movies = useAppSelector(state => state.movies.hero)
    
    const {countSpin, maxSteps, listRef, setCountSpin} = useSpinStep(movies, 3, smallCardWith)

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOrFetchMovies({path: 'trending/all/day', key: 'movies-hero'}))
    }, [])

    const heroRef = useRef<HTMLElement>(null)

    const intervalId = useRef<NodeJS.Timeout>(null)
    useEffect(() => {
        intervalId.current = setInterval(() => {            
            setSelectMovie(curr => (movies.length - 1 > selectMovie) ? (curr + 1) : 0 )
        }, 5000);
    
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [selectMovie, movies]);
    
    
    return {
        movies, selectMovie, setSelectMovie: callSetSelectMovie, 
        countSpin, setCountSpin, maxSteps, heroRef, listRef
    }
}

export default useManageHero