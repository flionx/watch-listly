import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useRedux';
import { scrollToUpPage } from '@/utils/scrollToUpPage';
import { fetchMovieWithId } from '@/app/store/thunks/movies/fetchMovie';
import { IMovie } from '@/types/movies';

const useMoviePage = () => {
    const {id, type } = useParams();
    const loading = useAppSelector(state => state.movies.movie.loading)
    const movie = useAppSelector(state => state.movies.movie.movie) as IMovie;
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (loading !== 'pending') {
            dispatch(fetchMovieWithId(
                {id: String(id), type: type as 'tv' | 'movie'}
            ));
        }
        scrollToUpPage();
        
    }, [id])

    return {movie, loading, type}
}

export default useMoviePage