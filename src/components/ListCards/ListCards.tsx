import { IMovie } from "@/types/movies"
import getImageUrl from "@/utils/getImageUrl"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import ArrowsList from "../ArrowsList/ArrowsList"
import './ListCards.css'
import { TSetState } from "@/types/global"
const oneScroll = 170;
interface Props {
    movies: IMovie[],
}

const ListCards: FC<Props> = ({movies}) => {
    const [countSpin, setCountSpin] = useState(0);
    const [maxSteps, setMaxSteps] = useState(0);
    const callSetCount = useCallback<TSetState<number>>((value) => setCountSpin(value), []);
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (listRef.current) {
            const containerWidth = listRef.current.getBoundingClientRect().width;
            const maxScroll = Math.max(0, Math.ceil(movies.length - containerWidth / oneScroll));
            setMaxSteps(maxScroll);
        }
    }, [movies]);

  return (
    <section className="card-list">
        <h3 className="card-list__title">Popular</h3>
        <ArrowsList 
            maxSteps={maxSteps}
            movies={movies} 
            spin={{countSpin, setCountSpin: callSetCount}}
        />
        <div className="card-list__row" ref={listRef} style={{transform: `translateX(-${countSpin * oneScroll}px)`}}>
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