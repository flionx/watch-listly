import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';
import { fetchMovieWithId, setMovie } from '@/app/store/slices/moviesSlice';
import { scrollToUpPage } from '@/utils/scrollToUpPage';
import { IMovie } from '@/types/movies';

const useMoviePage = () => {
    const {id, type } = useParams();
    const loading = useAppSelector(state => state.movies.movie.loading)
    const movie = useAppSelector(state => state.movies.movie.movie) as IMovie;
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchMovieWithId(
            {id: String(id), type: type as 'tv' | 'movie'}
        ));
        scrollToUpPage();
        return () => {
            dispatch(setMovie({}))
            localStorage.setItem('movie', '');
        }
    }, [id])

    return {movie, loading, type}
}

export default useMoviePage