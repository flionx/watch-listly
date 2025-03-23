import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getOrFetchMovies } from "@/app/store/slices/moviesSlice";
import SectionListCards from "../SectionListCards/SectionListCards";
import './PopularSection.css'

const PopularSection = () => {
    const moviesPopular =  useAppSelector(state => state.movies.popular);    
    const loading =  useAppSelector(state => state.movies.loading);    
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(getOrFetchMovies({path: 'movie/popular', key: 'movies-popular'}))
    }, [])

  return (
    <section className='popular-movies'>
      {moviesPopular.length > 0 && <SectionListCards movies={moviesPopular}/>}
      {loading === 'pending' && <p>Загрузка</p>}
    </section>
  )
}

export default PopularSection