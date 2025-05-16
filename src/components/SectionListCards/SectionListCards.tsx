import { countScrollSmall, smallCardWith } from "@/app/constants/movies"
import { FC, useRef } from "react"
import ListCards from "../ListCards/ListCards"
import ButtonsArrow from "@/ui/ButtonsArrow/ButtonsArrow"
import { IMovie } from "@/types/movies"
import './SectionListCards.css'
import LoadingListCard from "../Loading/LoadingListCard/LoadingListCard"
import { useAppSelector } from "@/hooks/useRedux"
import { TitleUnderline } from "@/ui/Text/Text"
interface Props {
    movies: IMovie[],
}

const SectionListCards: FC<Props> = ({movies}) => {
    const listRef = useRef<HTMLDivElement>(null);  
    const loading = useAppSelector(state => state.movies.popular.loading)
  return (
    <section className="card-list">
        <h3><TitleUnderline>Popular</TitleUnderline></h3>
        <ButtonsArrow 
            parentClass="arrows-full-w"
            buttonClass="arrow-circle arrow-btn"
            listRef={listRef} 
            countScroll={countScrollSmall}
            cardWith={smallCardWith}
        />
        {loading === 'pending' && <LoadingListCard />}
        {(loading === 'succeeded' || loading === 'idle') && 
            <ListCards 
            listRef={listRef} 
            movies={movies} 
            voting
        />}
    </section>
  )
}

export default SectionListCards