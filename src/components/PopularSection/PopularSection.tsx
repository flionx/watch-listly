import { useAppSelector } from "@/hooks/useRedux"
import ListCards from "../ListCards/ListCards"
import './PopularSection.css'
import useCheckStorage from "@/hooks/useCheckStorage";

const PopularSection = () => {
    const moviesPopular =  useAppSelector(state => state.movies.popular);    
    useCheckStorage('movie/popular', 'movies-popular', moviesPopular)

  return (
    <section className='popular-movies'>
        <ListCards movies={moviesPopular}/>
    </section>
  )
}

export default PopularSection