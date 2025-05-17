import { FC } from 'react'
import { IMovie } from '@/types/movies'
import getColor from '@/utils/getColorVote'
import './VoteCount.css'
interface PropsVote {
  vote: IMovie['vote_average']
}
interface PropsWithCount extends PropsVote {
  count: IMovie['vote_count'],
}

const StarVoteCount: FC<PropsWithCount> = ({vote, count}) => {
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
const StarVote: FC<PropsVote> = ({vote}) => {
  return (
    <div className="vote-star">{(vote).toFixed(1)}</div>
  )
}

export {StarVoteCount, StarVote}