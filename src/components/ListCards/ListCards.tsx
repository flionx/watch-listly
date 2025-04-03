import { FC, Ref, RefObject, useMemo } from "react"
import { TSetState } from "@/types/global"
import { IMovie } from "@/types/movies"
import ListCardsCard from "./ListCardsCard"
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
const ListCards: FC<Props> = ({listRef, movies, select, hero = false, voting = false}) => {
    const listClass = hero ? 'hero__list' : '';
    const filteredMovies = useMemo(() => {
        return movies.filter(movie => movie.media_type !== 'person')
    }, [movies])

  return (
    <div className={`card-list__row list-scroll ${listClass}`} 
        ref={listRef as Ref<HTMLDivElement>}>
        {movies.length > 0 &&  filteredMovies.map((movie, index) => (
            <ListCardsCard key={movie.id}
                index={index}
                movie={movie} 
                hero={hero} 
                select={select} 
                voting={voting}
            />
        ))}
    </div>
  )
}

export default ListCards