import { TSetState } from "@/types/global"
import { IMovie } from "@/types/movies"
import getColor from "@/utils/getColorVote"
import getImageUrl from "@/utils/getImageUrl"
import { FC, Ref, RefObject } from "react"
interface Props {
    listRef: RefObject<HTMLElement | null>,
    movies: IMovie[],
    hero?: boolean,
    voting?: boolean,
    select?: {
        selectMovie: number,
        setSelectMovie: TSetState<number>,
    },
}
const ListCards: FC<Props> = ({listRef, movies, select, hero = false, voting=false}) => {
    const addedClass = ((index: number) => (index === select?.selectMovie) ? 'hero__card-active' : '');

  return (
    <div className={`card-list__row list-scroll ${hero ? 'hero__list' : ''}`} 
        ref={listRef as Ref<HTMLDivElement>}>
        {movies.length > 0 &&  movies.map((movie, index) => (
            <button 
                className={`card-list__card ${hero ? 'hero__card ' + addedClass(index) : ''}`}
                key={movie.id} 
                onClick={select ? () => select?.setSelectMovie(index) :
                    () => {}
                }
            >
                {voting && movie.vote_average > 0 && 
                    <div className="card-list__vote"
                        style={{background: getColor(movie?.vote_average)}}>
                        {movie.vote_average.toFixed(1)}
                    </div>}
                <img src={`${getImageUrl(movie.poster_path, 'w300')}`} alt={movie.title} />
            </button>
        ))}
    </div>
  )
}

export default ListCards