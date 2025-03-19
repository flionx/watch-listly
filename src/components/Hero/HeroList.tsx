import { FC, RefObject} from 'react'
import { TSetState } from '@/types/global'
import { IMovie } from '@/types/movies'
import getImageUrl from '@/utils/getImageUrl'
import { oneScroll } from '@/app/constants/movies'

interface Props {
    movies: IMovie[],
    listRef: RefObject<HTMLElement | null>
    select: {
        selectMovie: number,
        setSelectMovie: TSetState<number>,
    },
    countSpin: number
}

const HeroList:FC<Props> = ({movies, listRef, select, countSpin}) => {
    const addedClass = (index: number) => (index === selectMovie) ? 'hero__card-active' : '';
    const {selectMovie, setSelectMovie} = select;

  return (
    <section ref={listRef} className="hero__list" style={{transform: `translate(-${countSpin * oneScroll}px)`}}>
        {movies.length > 0 &&  movies.map((movie, index) => (
            <button 
                className={`hero__card ${addedClass(index)}`}
                key={movie.id} 
                onClick={() => setSelectMovie(index)}
            >
                <img src={`${getImageUrl(movie.poster_path, 'w300')}`} alt={movie.title} />
            </button>
        ))}
    </section>
  )
}

export default HeroList