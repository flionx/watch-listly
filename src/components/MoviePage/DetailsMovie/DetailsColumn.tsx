import { FC } from 'react'
import DetailsMovie from './DetailsMovie'
import LineDetails from './LineDetails'
import DetailsGenres from './DetailsGenres'
import { StarVoteCount } from '../../VoteCount/VoteCount'
import { TMovieMediaType } from '@/types/global'
import { IMovie } from '@/types/movies'
import { TitleSmall } from '@/ui/Text/Text'
import DetailsSection from './DetailsSection'
interface Props {
    movie: IMovie,
    type: TMovieMediaType
}

const DetailsColumn: FC<Props> = ({movie, type}) => {  
  
  return (
    <div className="movie-main__details">
      <DetailsSection>
        <h4><TitleSmall>Details</TitleSmall></h4>
        <DetailsMovie movie={movie} type={type}/> 
        <LineDetails />
        {movie?.genres.length > 0 && <>
          <h4><TitleSmall>Genres</TitleSmall></h4>
          <DetailsGenres genres={movie.genres}/>
        </>}
        {movie.vote_count > 0 && movie.vote_average > 0 &&
        <>
          <LineDetails />
          <StarVoteCount vote={movie.vote_average} count={movie.vote_count}/>
        </>}
      </DetailsSection>
    </div>
  )
}

export default DetailsColumn