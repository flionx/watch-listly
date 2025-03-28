import { FC } from 'react'
import { IMovie } from '@/types/movies'
import getColor from '@/utils/getColorVote'
import './VoteCount.css'
interface Props {
  vote: IMovie['vote_average'],
  count: IMovie['vote_count'],
}

const VoteCount:FC<Props> = ({vote, count}) => {
  return (
    <div className='vote-block'>
    {count > 0 && 
        <div className="vote-avg" 
            style={{background: getColor(vote)}}
        >{vote.toFixed(1)}</div> }
    <div className="vote-avg-count">{'(' + count + ')'}</div>
    </div>
  )
}

export default VoteCount