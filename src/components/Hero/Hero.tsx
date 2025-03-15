import {useCallback, useEffect, useRef, useState } from 'react';
import getImageUrl from '../../utils/getImageUrl';
import { useAppSelector } from '../../hooks/useRedux';
import HeroInfo from './HeroInfo';
import useCheckStorage from '../../hooks/useCheckStorage';
import HeroArrows from './HeroArrows';
import { TSetState } from '../../types/global';
import './Hero.css'

const Hero = () => {
    const movies = useAppSelector(state => state.movies.hero)
    const [selectMovie, setSelectMovie] = useState(0);
    const callSetSelectMovie = useCallback<TSetState<number>>((value) => setSelectMovie(value), [])
    const oneScroll = 170;
    useCheckStorage('movie/popular', 'movies-hero')


    const intervalId = useRef<NodeJS.Timeout>(null)
    useEffect(() => {
        intervalId.current = setInterval(() => {
            setSelectMovie((curr) => {
                return (movies.length - 1 > curr) ? curr + 1 : 0;
            });
        }, 5000);
    
        return () => {
            if (intervalId.current) clearInterval(intervalId.current);
        };
    }, []);

  return (
    <section className="hero" 
        style={{backgroundImage: `url(${getImageUrl(movies[selectMovie]?.backdrop_path, 'original')})`}}>

        <HeroInfo movie={movies[selectMovie]}/>
        <HeroArrows movies={movies} select={{selectMovie, setSelectMovie: callSetSelectMovie}}/>

        <section className="hero__list" 
            style={{transform: `translate(-${selectMovie * oneScroll}px)`}}>
            {movies.length > 0 &&  movies.map((movie, index) => (
                <div key={movie.id} className={`hero__card ${index === selectMovie && 'hero__card-active'}`}>
                    <img src={`${getImageUrl(movie.poster_path, 'original')}`} alt={movie.title} />
                </div>
            ))}
        </section>
    </section>
  )
}

export default Hero