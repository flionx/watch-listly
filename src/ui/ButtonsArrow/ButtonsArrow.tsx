import { FC } from 'react'
import { TSetState } from '@/types/global'
import './ButtonsArrow.css'
const step = 3;

interface Props {
  parentClass: string,
  buttonClass: string,
  setCountSpin: TSetState<number>
  maxSteps: number
}

const ButtonsArrow: FC<Props> = ({setCountSpin, maxSteps, parentClass, buttonClass}) => {
  const prevHandle = () => {
    setCountSpin((prev) => Math.max(0, prev - step));
  };
  
  const nextHandle = () => {
    setCountSpin((prev) => Math.min(maxSteps, prev + Math.min(step, maxSteps - prev)));
  };

  return (
    <div className={parentClass}>
        <button onClick={prevHandle} className={`${buttonClass} arrow-btn`}></button>
        <button onClick={nextHandle} className={`${buttonClass} arrow-btn`}></button>
    </div>
  )
}

export default ButtonsArrow