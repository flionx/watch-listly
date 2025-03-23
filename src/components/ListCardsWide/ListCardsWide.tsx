import { FC, Ref, RefObject } from 'react'
import { Link } from 'react-router-dom'
import getImageUrl from '@/utils/getImageUrl'
import { IMovie } from '@/types/movies'
import './ListCardsWide.css'
interface Props {
    movies: IMovie[],
    listRef: RefObject<HTMLElement | null>,
    countSpin: number,
    oneScroll: number
}

const ListCardsWide:FC<Props> = ({movies, listRef, countSpin, oneScroll}) => {

  return (
    <div className='list-wide'
        style={{transform: `translateX(-${countSpin * oneScroll}px)`}}
        ref={listRef as Ref<HTMLDivElement>}>
        {movies.length > 0 && movies.map((movie, index) => (
            <div className='list-wide__card'
                key={movie.id}
            >
                <Link to='/' className="list-wide__card-img" style={{backgroundImage: `url(${getImageUrl(movie.poster_path, 'w400')})`}}></Link>
                <div className="list-wide__card-bottom">
                    <Link to='/' className="list-wide__card-title">{movie.title || movie.name}</Link>
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