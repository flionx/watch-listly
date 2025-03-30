import { FC } from 'react'
import DetailsMovie from './DetailsMovie'
import LineDetails from './LineDetails'
import DetailsGenres from './DetailsGenres'
import VoteCount from '../../VoteCount/VoteCount'
import { TMovieMediaType } from '@/types/global'
import { IMovie } from '@/types/movies'
interface Props {
    movie: IMovie,
    type: TMovieMediaType
}

const DetailsColumn: FC<Props> = ({movie, type}) => {
  console.log(movie);
  
  return (
    <div className="movie-main__details">
        <div className="movie-main__column details-movie">
            <h4 className="details-movie__title">Details</h4>
            <DetailsMovie movie={movie} type={type}/> 
            <LineDetails />
            {movie.genres && movie.genres.length > 0 && <>
              <h4 className="details-movie__title">Genres</h4>
              <DetailsGenres genres={movie.genres}/>
            </>}
            {movie.vote_count && movie.vote_count > 0 && 
            <>
              <LineDetails />
              <VoteCount vote={movie.vote_average} count={movie.vote_count}/>
            </>}
        </div>
    </div>
  )
}

export default DetailsColumn