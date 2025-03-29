import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieWithId, setMovie } from "@/app/store/slices/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import getImageUrl from "@/utils/getImageUrl"
import ButtonHero from "@/ui/ButtonHero/ButtonHero";
import WideListSection from "@/components/WideListSection/WideListSection";
import DetailsColumn from "@/components/DetailsMovie/DetailsColumn";
import { TMovieMediaType } from "@/types/global";
import { IMovie, IMovieVideo } from "@/types/movies";
import '@/app/styles/css/moviePage.css';
import MovieTrailer, { renderTrailer } from "@/components/MovieTrailer/MovieTrailer";

const MoviePage = () => {
    const movie = useAppSelector(state => state.movies.movie.movie) as IMovie;
    const {id, type } = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovieWithId(
            {id: String(id), type: type as 'tv' | 'movie'}
        ));
        scrollTo({
            top: 0,            
            behavior:"smooth",
        })

        return () => {
            dispatch(setMovie({}))
        }
    }, [id])

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
                <div className="movie-main__container">
                    <div className="movie-main__block-text">
                        <h3 className="movie-main__title">Description</h3>  
                        <h3 className="movie-main__text">{movie.overview}</h3>  
                    </div>
                    <div className="movie-main__block-details">
                        <DetailsColumn movie={movie} type={type as TMovieMediaType}/>
                    </div>
                    {movie.videos?.results.length! > 0 && renderTrailer(movie.videos?.results!)}
                </div>
                <div className="movie-main__list">
                    <WideListSection title='See also'
                        path='movie/now_playing' storageKey="movies-watching"
                        padding={false}
                        type="movie"
                    />  
                </div>
            </section>           
        }
    </>)
}

export default MoviePage