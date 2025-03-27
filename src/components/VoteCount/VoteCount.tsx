import { FC } from 'react'
import { IMovie } from '@/types/movies'
import getColor from '@/utils/getColorVote'
import './VoteCount.css'
interface Props {
    movie: IMovie,
}

const VoteCount:FC<Props> = ({movie}) => {
  return (
    <div className='vote-block'>
    {movie.vote_count > 0 && 
        <div className="vote-avg" 
            style={{background: getColor(movie?.vote_average)}}
        >{movie?.vote_average.toFixed(1)}</div> }
    <div className="vote-avg-count">{'(' + movie?.vote_count + ')'}</div>
    </div>
  )
}

export default VoteCount