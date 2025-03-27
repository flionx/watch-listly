import { FC, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getOrFetchMovies } from "@/app/store/slices/moviesSlice";
import { countScrollWide, wideCardWith } from "@/app/constants/movies";
import ListCardsWide from "../ListCardsWide/ListCardsWide";
import ButtonsArrow from "@/ui/ButtonsArrow/ButtonsArrow"
interface Props {
  title: string,
  path: string,
  storageKey: 'movies-watching' | 'movies-upcoming',
  padding?: boolean
}

const WideListSection:FC<Props> = ({title, path, storageKey, padding = true}) => {
  const dispatch = useAppDispatch();
    const moviesWatching =  useAppSelector(state => (
      storageKey === 'movies-watching' ? state.movies.watching : state.movies.upcoming
    ));    
    useEffect(() => {
        dispatch(getOrFetchMovies({path, key: storageKey}))
    }, [])
    const listRef = useRef<HTMLDivElement>(null)

  return (
    <section className={`card-list ${!padding ? 'card-list-p0' : ''}`}>
        <h3 className="card-list__title">{title}</h3>
        <ButtonsArrow 
            parentClass="arrows-full-w"
            buttonClass="arrow-circle arrow-btn"
            cardWith={wideCardWith}
            countScroll={countScrollWide}
            listRef={listRef}
        />
        <ListCardsWide
            movies={moviesWatching} listRef={listRef}/>
    </section>
  )
}

export default WideListSection