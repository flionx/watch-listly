import { FC} from "react";
import { countScrollWide, wideCardWith } from "@/app/constants/movies";
import ListCardsWide from "../ListCardsWide/ListCardsWide";
import ButtonsArrow from "@/ui/ButtonsArrow/ButtonsArrow"
import { TMovieMediaType } from "@/types/global";
import LoadingListCard from "../Loading/LoadingListCard/LoadingListCard";
import useMoviesWide from "@/hooks/useMoviesWide";
import { TitleUnderline } from "@/ui/Text/Text";
export type TStorageWideKey = 'movies-watching' | 'movies-upcoming' | 'movies-series'
interface Props {
  title: string,
  path: string,
  type: TMovieMediaType,
  storageKey: TStorageWideKey,
  padding?: boolean
}

const WideListSection:FC<Props> = ({title, path, storageKey, padding = true, type}) => {

  const {movies, loading, listRef} = useMoviesWide(path, storageKey)

  return (
    <section className={`card-list ${!padding ? 'card-list-p0' : ''}`}>
        <h3><TitleUnderline>{title}</TitleUnderline></h3>
        <ButtonsArrow 
            parentClass="arrows-full-w"
            buttonClass="arrow-circle arrow-btn"
            cardWith={wideCardWith}
            countScroll={countScrollWide}
            listRef={listRef}
        />
        {(loading === 'pending' && <LoadingListCard wide />)}
        {(loading === 'idle' || loading === 'succeeded') && 
          <ListCardsWide
            movies={movies} 
            listRef={listRef}
            type={type}
        />}
    </section>
  )
}

export default WideListSection