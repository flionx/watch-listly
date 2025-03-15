import { FC } from 'react'
import { IMovie } from '../../types/movies'
import { TSetState } from '../../types/global';
interface Props {
    select: {
        selectMovie: number,
        setSelectMovie: TSetState<number>,
    },
    movies: IMovie[]
}

const HeroArrows:FC<Props> = ({select, movies}) => {
    const {selectMovie, setSelectMovie} = select;
    const nextHandle = () => {
        if (selectMovie < movies.length - 1) {
            setSelectMovie(curr => curr + 1)
        }
    }
    const prevHandle = () => {
        if (selectMovie > 0) {
            setSelectMovie(curr => curr - 1)
        }
    }

  return (
    <div className='hero__arrows'>
        <button onClick={prevHandle} className='hero__arrow-btn'></button>
        <button onClick={nextHandle} className='hero__arrow-btn'></button>
    </div>
  )
}

export default HeroArrows