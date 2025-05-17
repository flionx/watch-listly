import { FC, Ref, RefObject } from 'react'
import { Link } from 'react-router-dom'
import getImageUrl from '@/utils/getImageUrl'
import { IMovie } from '@/types/movies'
import { TMovieMediaType } from '@/types/global'
import { formatDate } from '@/utils/formatInfo'
import { StarVote } from '../VoteCount/VoteCount'
import { TextGray } from '@/ui/Text/Text'
import './ListCardsWide.css'
interface Props {
    movies: IMovie[],
    listRef: RefObject<HTMLElement | null>,
    type: TMovieMediaType,
}

const ListCardsWide:FC<Props> = ({movies, listRef, type}) => {

  return (
    <div className='list-wide list-scroll'
        ref={listRef as Ref<HTMLDivElement>}>
        {movies.length > 0 && movies.map((movie) => (
            <div className='list-wide__card'
                key={movie.id}
            >
                <Link to={`/${movie.media_type ?? type}/${movie.id}`} className="list-wide__card-img" style={{backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w500')})`}}></Link>
                <div className="list-wide__card-bottom">
                    <Link to={`/${movie.media_type ?? type}/${movie.id}`} className="list-wide__card-title">{movie.title || movie.name}</Link>
                    <div className="list-wide__card-info">
                        {movie.vote_average > 0 && <StarVote vote={movie.vote_average} />}
                        <TextGray>{formatDate(type === 'movie' ?  movie.release_date : movie.first_air_date!)}</TextGray>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ListCardsWide