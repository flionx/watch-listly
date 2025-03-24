import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { getOrFetchMovies } from "@/app/store/slices/moviesSlice";
import ButtonsArrow from "@/ui/ButtonsArrow/ButtonsArrow"
import ListCardsWide from "../ListCardsWide/ListCardsWide";
import useSpinStep from "@/hooks/useSpinStep";
const oneScroll = 205.4;
interface Props {
  title: string,
  path: string,
  storageKey: 'movies-watching' | 'movies-upcoming',
}

const CurrWatchingSection:FC<Props> = ({title, path, storageKey}) => {
    const moviesWatching =  useAppSelector(state => (
      storageKey === 'movies-watching' ? state.movies.watching : state.movies.upcoming
    ));    
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getOrFetchMovies({path, key: storageKey}))
    }, [])
    const {countSpin, maxSteps, listRef, setCountSpin} = useSpinStep(moviesWatching, oneScroll);

  return (
    <section className="card-list">
        <h3 className="card-list__title">{title}</h3>
        <ButtonsArrow 
            parentClass="arrows-full-w"
            buttonClass="arrow-circle arrow-btn"
            maxSteps={maxSteps}
            setCountSpin={setCountSpin}
        />
        <ListCardsWide
            countSpin={countSpin}
            oneScroll={oneScroll}
            movies={moviesWatching} listRef={listRef}/>
    </section>
  )
}

export default CurrWatchingSection