import { FC } from 'react'
import DetailsColumn from '@/components/MoviePage/DetailsMovie/DetailsColumn'
import { renderTrailer } from '@/components/MovieTrailer/MovieTrailer'
import { TMovieMediaType } from '@/types/global'
import { IMovie } from '@/types/movies'
interface Props {
    movie: IMovie,
    type: string,
}

const InfoMoviePage:FC<Props> = ({movie, type}) => {
  
  return (
    <div className="movie-main__container">
        <div className="movie-main__block-text">
            {movie.overview && <>
              <h3 className="movie-main__title">Description</h3>  
              <p className="movie-main__text">{movie.overview}</p>
            </>}
        </div>
        <div className="movie-main__block-details">
            <DetailsColumn movie={movie} type={type as TMovieMediaType}/>
        </div>
        {movie.videos?.results.length! > 0 && renderTrailer(movie.videos?.results!)}
    </div>
  )
}

export default InfoMoviePage