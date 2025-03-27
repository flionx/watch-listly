import { fetchMovieWithId, setMovie } from "@/app/store/slices/moviesSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { IMovie } from "@/types/movies";
import ButtonHero from "@/ui/ButtonHero/ButtonHero";
import getImageUrl from "@/utils/getImageUrl"
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsMovie from "@/components/DetailsMovie/DetailsMovie";
import LineDetails from "@/components/DetailsMovie/LineDetails";
import DetailsGenres from "@/components/DetailsMovie/DetailsGenres";
import VoteCount from "@/components/VoteCount/VoteCount";
import '@/app/styles/css/moviePage.css';
import WideListSection from "@/components/WideListSection/WideListSection";

const MoviePage = () => {
    const movie = useAppSelector(state => state.movies.movie.movie) as IMovie;
    const {id} = useParams();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovieWithId(String(id)));
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
                <div className="movie-main__row">
                    <div className="movie-main__main">
                        <h3 className="movie-main__title">Description</h3>  
                        <h3 className="movie-main__text">{movie.overview}</h3>  
                        {/* trailer */}
                    </div>
                    <div className="movie-main__detail">
                        <div className="movie-main__column details-movie">
                            <h4 className="details-movie__title">Details</h4>
                            <DetailsMovie movie={movie} />
                            <LineDetails />
                            <h4 className="details-movie__title">Genres</h4>
                            <DetailsGenres genres={movie.genres}/>
                            <LineDetails />
                            <VoteCount movie={movie}/>
                        </div>
                    </div>
                </div>
                <WideListSection title='See also'
                    path='movie/now_playing' storageKey="movies-watching"
                    padding={false}
                />
            </section>
        }
    </>
    
  )
}

export default MoviePage