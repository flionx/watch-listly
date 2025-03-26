import { fetchMovieWithId, setMovie } from "@/app/store/slices/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IMovie } from "@/types/movies";
import ButtonHero from "@/ui/ButtonHero/ButtonHero";
import getImageUrl from "@/utils/getImageUrl"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
        <section className="movie-main">
            <div className="movie-main__row">
                <div className="movie-main__main">
                    <h3 className="movie-main__title">Description</h3>  
                    <h3 className="movie-main__text">{movie.overview}</h3>  
                    {/* trailer */}
                </div>
                <div className="movie-main__detail"></div>
            </div>
        </section>
    </>
    
  )
}

export default MoviePage