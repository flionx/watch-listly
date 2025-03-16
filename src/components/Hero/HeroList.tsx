import { FC} from 'react'
import { TSetState } from '@/types/global'
import { IMovie } from '@/types/movies'
import getImageUrl from '@/utils/getImageUrl'

interface Props {
    movies: IMovie[],
    select: {
        selectMovie: number,
        setSelectMovie: TSetState<number>,
    },
    spin: {
        spinCount : number,
        setSpinCount: TSetState<number>,
    },
    oneScroll: number,
}

const HeroList:FC<Props> = ({movies, select, spin, oneScroll}) => {
    const addedClass = (index: number) => (index === selectMovie) ? 'hero__card-active' : '';
    const {selectMovie, setSelectMovie} = select;
    const {spinCount, setSpinCount} = spin;

  return (
    <section className="hero__list" style={{transform: `translate(-${spinCount * oneScroll}px)`}}>
        {movies.length > 0 &&  movies.map((movie, index) => (
            <button 
                className={`hero__card ${addedClass(index)}`}
                key={movie.id} 
                onClick={() => setSelectMovie(index)}
            >
                <img src={`${getImageUrl(movie.poster_path, 'original')}`} alt={movie.title} />
            </button>
        ))}
    </section>
  )
}

export default HeroList