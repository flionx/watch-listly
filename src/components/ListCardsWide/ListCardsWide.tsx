import { FC, Ref, RefObject } from 'react'
import { Link } from 'react-router-dom'
import getImageUrl from '@/utils/getImageUrl'
import { IMovie } from '@/types/movies'
import './ListCardsWide.css'
import { TMovieMediaType } from '@/types/global'
interface Props {
    movies: IMovie[],
    listRef: RefObject<HTMLElement | null>,
    type: TMovieMediaType,
}

const ListCardsWide:FC<Props> = ({movies, listRef, type}) => {

  return (
    <div className='list-wide list-scroll'
        ref={listRef as Ref<HTMLDivElement>}>
        {movies.length > 0 && movies.map((movie, index) => (
            <div className='list-wide__card'
                key={movie.id}
            >
                <Link to={`/${movie.media_type ?? type}/${movie.id}`} className="list-wide__card-img" style={{backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'w500')})`}}></Link>
                <div className="list-wide__card-bottom">
                    <Link to={`/${movie.media_type ?? type}/${movie.id}`} className="list-wide__card-title">{movie.title || movie.name}</Link>
                    <div className="list-wide__card-info">
                        {movie.vote_average > 0 && <div className="list-wide__card-vote">{(movie.vote_average).toFixed(1)}</div>}
                        <div className="list-wide__card-date">{movie.release_date}</div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default ListCardsWide