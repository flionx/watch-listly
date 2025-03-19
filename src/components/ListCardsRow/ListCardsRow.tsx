import { oneScroll } from "@/app/constants/movies"
import { TSetState } from "@/types/global"
import { IMovie } from "@/types/movies"
import getImageUrl from "@/utils/getImageUrl"
import { FC, Ref, RefObject } from "react"
interface Props {
    listRef: RefObject<HTMLElement | null>,
    movies: IMovie[],
    countSpin: number,
    select?: {
        selectMovie: number,
        setSelectMovie: TSetState<number>,
    },
    hero?: boolean,
}
const ListCardsRow: FC<Props> = ({listRef, movies, countSpin, select, hero = false}) => {
    const addedClass = ((index: number) => (index === select?.selectMovie) ? 'hero__card-active' : '');

  return (
    <div className={`card-list__row ${hero ? 'hero__list' : ''}`} 
        ref={listRef as Ref<HTMLDivElement>} 
        style={{transform: `translateX(-${countSpin * oneScroll}px)`}}>
        {movies.length > 0 &&  movies.map((movie, index) => (
            <button 
                className={`card-list__card ${hero ? 'hero__card ' + addedClass(index) : ''}`}
                key={movie.id} 
                onClick={select ? () => select?.setSelectMovie(index) :
                    () => {}
                }
            >
                <img src={`${getImageUrl(movie.poster_path, 'w300')}`} alt={movie.title} />
            </button>
        ))}
    </div>
  )
}

export default ListCardsRow