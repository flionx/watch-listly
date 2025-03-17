import {useCallback, useEffect, useRef, useState } from 'react';
import getImageUrl from '../../utils/getImageUrl';
import { useAppSelector } from '../../hooks/useRedux';
import HeroInfo from './HeroInfo';
import useCheckStorage from '../../hooks/useCheckStorage';
import HeroArrows from './HeroArrows';
import { TSetState } from '../../types/global';
import './Hero.css'
import HeroList from './HeroList';
const oneScroll = 170;

const Hero = () => {
    const movies = useAppSelector(state => state.movies.hero)
    const [selectMovie, setSelectMovie] = useState(0);
    const [spinCount, setSpinCount] = useState(0);
    const [hiddenCards, setHiddenCards] = useState(20)
    const callSetSelectMovie = useCallback<TSetState<number>>((value) => setSelectMovie(value), [])
    const callSetSpinCount = useCallback<TSetState<number>>((value) => setSpinCount(value), [])
    const callSethiddenCards = useCallback<TSetState<number>>((value) => setHiddenCards(value), [])
    useCheckStorage('trending/all/day', 'movies-hero', movies)

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

        {movies.length > 0 && <HeroInfo movie={movies[selectMovie]}/>}
        {movies.length > 0 && 
        <HeroArrows 
            heroRef={heroRef}
            oneScroll={oneScroll} 
            hideCards={{hiddenCards, setHiddenCards: callSethiddenCards}}
            spin={{spinCount, setSpinCount: callSetSpinCount}}
        />}

        <HeroList 
            movies={movies} 
            oneScroll={oneScroll} 
            spin={{spinCount, setSpinCount: callSetSpinCount}}
            select={{selectMovie, setSelectMovie: callSetSelectMovie}} 
        />
    </section>
  )
}

export default Hero