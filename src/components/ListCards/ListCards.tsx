import { FC, Ref } from "react"
import { oneScroll } from "@/app/constants/movies"
import { IMovie } from "@/types/movies"
import getImageUrl from "@/utils/getImageUrl"
import useSpinStep from "@/hooks/useSpinStep"
import ButtonsArrow from "../../ui/ButtonsArrow/ButtonsArrow"
import './ListCards.css'
interface Props {
    movies: IMovie[],
}

const ListCards: FC<Props> = ({movies}) => {
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
        <div className="card-list__row" 
            ref={listRef as Ref<HTMLDivElement>} 
            style={{transform: `translateX(-${countSpin * oneScroll}px)`}}>
            {movies.length > 0 &&  movies.map((movie, index) => (
                <button 
                    className='card-list__card'
                    key={movie.id} 
                    onClick={() => {}}
                >
                    <img src={`${getImageUrl(movie.poster_path, 'original')}`} alt={movie.title} />
                </button>
            ))}
        </div>
    </section>
  )
}

export default ListCards