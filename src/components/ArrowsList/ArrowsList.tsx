import { FC } from 'react'
import './ArrowsList.css'
import { IMovie } from '@/types/movies'
import { TSetState } from '@/types/global'
const step = 3;
interface Props {
  movies: IMovie[],
  spin: {
    countSpin:number, 
    setCountSpin: TSetState<number>
  },
  maxSteps: number
}

const ArrowsList: FC<Props> = ({movies, spin, maxSteps}) => {
  const {countSpin, setCountSpin} = spin;
  const prevHandle = () => {
    setCountSpin((prev) => Math.max(0, prev - step));
  };
  
  const nextHandle = () => {
    setCountSpin((prev) => Math.min(maxSteps, prev + Math.min(step, maxSteps - prev)));
  };

  return (
    <div className="arrows-full-w">
        <button onClick={prevHandle} className="arrow-circle arrow-btn"></button>
        <button onClick={nextHandle} className="arrow-circle arrow-btn"></button>
    </div>
  )
}

export default ArrowsList