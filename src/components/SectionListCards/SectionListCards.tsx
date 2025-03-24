import { FC } from "react"
import useSpinStep from "@/hooks/useSpinStep"
import ListCards from "../ListCards/ListCards"
import ButtonsArrow from "@/ui/ButtonsArrow/ButtonsArrow"
import { oneScroll } from "@/app/constants/movies"
import { IMovie } from "@/types/movies"
import './SectionListCards.css'
interface Props {
    movies: IMovie[],
}

const SectionListCards: FC<Props> = ({movies}) => {
    const {countSpin, maxSteps, listRef, setCountSpin} = useSpinStep(movies, oneScroll);

  return (
    <section className="card-list">
        <h3 className="card-list__title">Popular</h3>
        <ButtonsArrow 
            parentClass="arrows-full-w"
            buttonClass="arrow-circle arrow-btn"
            maxSteps={maxSteps}
            setCountSpin={setCountSpin}
        />
        <ListCards 
            listRef={listRef} 
            movies={movies} 
            countSpin={countSpin}
        />
    </section>
  )
}

export default SectionListCards