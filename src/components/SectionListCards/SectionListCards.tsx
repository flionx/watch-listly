import { countScrollSmall, smallCardWith } from "@/app/constants/movies"
import { FC, useRef } from "react"
import ListCards from "../ListCards/ListCards"
import ButtonsArrow from "@/ui/ButtonsArrow/ButtonsArrow"
import { IMovie } from "@/types/movies"
import './SectionListCards.css'
interface Props {
    movies: IMovie[],
}

const SectionListCards: FC<Props> = ({movies}) => {
    const listRef = useRef<HTMLDivElement>(null);  
  return (
    <section className="card-list">
        <h3 className="card-list__title">Popular</h3>
        <ButtonsArrow 
            parentClass="arrows-full-w"
            buttonClass="arrow-circle arrow-btn"
            listRef={listRef} 
            countScroll={countScrollSmall}
            cardWith={smallCardWith}
        />
        <ListCards 
            listRef={listRef} 
            movies={movies} 
            voting
        />
    </section>
  )
}

export default SectionListCards