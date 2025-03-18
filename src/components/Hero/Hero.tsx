import {useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getOrFetchMovies } from '@/app/store/slices/moviesSlice';
import { TSetState } from '../../types/global';
import HeroInfo from './HeroInfo';
import HeroArrows from './HeroArrows';
import HeroList from './HeroList';
import getImageUrl from '@/utils/getImageUrl';
import './Hero.css'

const Hero = () => {
    const movies = useAppSelector(state => state.movies.hero)
    const loading = useAppSelector(state => state.movies.loading)
    
    const [selectMovie, setSelectMovie] = useState(0);
    const [spinCount, setSpinCount] = useState(0);
    const [hiddenCards, setHiddenCards] = useState(20)
    const callSetSelectMovie = useCallback<TSetState<number>>((value) => setSelectMovie(value), [])
    const callSetSpinCount = useCallback<TSetState<number>>((value) => setSpinCount(value), [])
    const callSethiddenCards = useCallback<TSetState<number>>((value) => setHiddenCards(value), [])
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOrFetchMovies({path: 'trending/all/day', key: 'movies-hero'}))
    }, [])

    const heroRef = useRef<HTMLElement>(null)

    const intervalId = useRef<NodeJS.Timeout>(null)
    useEffect(() => {
        intervalId.current = setInterval(() => {            
            setSelectMovie((curr) => {
                return (movies.length - 1 > curr) ? curr + 1 : 0;
            });       
            if (selectMovie >= (20 - hiddenCards - 1)) {
                if (movies.length - 1 > selectMovie) {
                    setSpinCount(curr => curr + 1)
                } else {
                    setSpinCount(0)
                }
            }   
            
        }, 5000);
    
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, [selectMovie, hiddenCards]);

  return (
    <section className="hero" ref={heroRef} 
        style={{backgroundImage: `url(${getImageUrl(movies[selectMovie]?.backdrop_path, 'original')})`}}>
        {loading === 'pending' && <p>Загрузка</p>}

        {movies.length > 0 && 
        <>
            <HeroInfo movie={movies[selectMovie]}/>
            <HeroArrows 
                heroRef={heroRef}
                hideCards={{hiddenCards, setHiddenCards: callSethiddenCards}}
                spin={{spinCount, setSpinCount: callSetSpinCount}}
            />
            <HeroList 
                movies={movies} 
                spin={{spinCount, setSpinCount: callSetSpinCount}}
                select={{selectMovie, setSelectMovie: callSetSelectMovie}} 
            />
        </>}
    </section>
  )
}

export default Hero