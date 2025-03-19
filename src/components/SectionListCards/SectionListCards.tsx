import { FC } from "react"
import { IMovie } from "@/types/movies"
import useSpinStep from "@/hooks/useSpinStep"
import ButtonsArrow from "../../ui/ButtonsArrow/ButtonsArrow"
import ListCardsRow from "../ListCardsRow/ListCardsRow"
import './SectionListCards.css'
interface Props {
    movies: IMovie[],
}

const SectionListCards: FC<Props> = ({movies}) => {
    const {countSpin, maxSteps, listRef, setCountSpin} = useSpinStep(movies);

  return (
    <section className="card-list">
        <h3 className="card-list__title">Popular</h3>
        <ButtonsArrow 
            parentClass="arrows-full-w"
            buttonClass="arrow-circle arrow-btn"
            maxSteps={maxSteps}
            setCountSpin={setCountSpin}
        />
        <ListCardsRow 
            listRef={listRef} 
            movies={movies} 
            countSpin={countSpin}
        />
    </section>
  )
}

export default SectionListCards