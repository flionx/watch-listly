import { fetchMovieWithId, setMovie } from "@/app/store/slices/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IMovie } from "@/types/movies";
import ButtonHero from "@/ui/ButtonHero/ButtonHero";
import getImageUrl from "@/utils/getImageUrl"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import '@/app/styles/css/moviePage.css';
import dateIcon from '/moviePage/date.svg?url'
import clockIcon from '/moviePage/clock.svg?url'
import countryIcon from '/moviePage/country.svg?url'
import moneyIcon from '/moviePage/money.svg?url'

const MoviePage = () => {
    const movie = useAppSelector(state => state.movies.movie.movie) as IMovie;
    const {id} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovieWithId(String(id)));
        return () => {
            dispatch(setMovie({}))
        }
    }, [])

  return (
    <>
        <section className="movie-page-hero"
        style={{
            backgroundImage: `url(${getImageUrl(movie?.backdrop_path, 'original')})`}}>
            <div className="movie-page-hero__hello">
                <h2 className="movie-page-hero__title">{movie.title ?? movie.name}</h2>
                <div className="movie-page-hero__btns">
                    <ButtonHero icon='plus' onClick={() => {}}>Add to list</ButtonHero>
                    <ButtonHero noBg icon='share' onClick={() => {}}>Share</ButtonHero>
                </div>
            </div>
        </section>
        {'id' in movie && 
            <section className="movie-main">
                <div className="movie-main__row">
                    <div className="movie-main__main">
                        <h3 className="movie-main__title">Description</h3>  
                        <h3 className="movie-main__text">{movie.overview}</h3>  
                        {/* trailer */}
                    </div>
                    <div className="movie-main__detail">
                        <div className="movie-main__column details-movie">
                            <h4 className="details-movie__title">Details</h4>
                            <p className="details-movie__row">
                                <img src={dateIcon} alt="date icon" />
                                {movie.release_date}
                            </p>
                            <p className="details-movie__row">
                                <img src={clockIcon} alt="date icon" />
                                {movie.runtime} mins
                            </p>
                            <p className="details-movie__row">
                                <img src={countryIcon} alt="date icon" />
                                {movie.production_countries[0]?.name ?? ''}
                            </p>
                            <p className="details-movie__row">
                                <img src={moneyIcon} alt="date icon" />
                                {movie.budget}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        }
    </>
    
  )
}

export default MoviePage