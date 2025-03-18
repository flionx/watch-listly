import { FC } from 'react'
import { TSetState } from '@/types/global'
import './ButtonsArrow.css'
const step = 3;

interface Props {
  setCountSpin: TSetState<number>
  maxSteps: number
}

const ButtonsArrow: FC<Props> = ({setCountSpin, maxSteps}) => {
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

export default ButtonsArrow