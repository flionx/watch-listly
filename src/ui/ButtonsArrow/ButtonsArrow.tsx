import { FC } from 'react'
import { TSetState } from '@/types/global'
import './ButtonsArrow.css'
interface Props {
  parentClass: string,
  buttonClass: string,
  setCountSpin: TSetState<number>
  maxSteps: number
}

const ButtonsArrow: FC<Props> = ({setCountSpin, maxSteps, parentClass, buttonClass}) => {
  const prevHandle = () => {
    setCountSpin((prev) => Math.max(0, prev - 1));
  };
  
  const nextHandle = () => {
    setCountSpin((prev) => Math.min(maxSteps, prev + 1));
  };

  return (
    <div className={parentClass}>
        <button onClick={prevHandle} className={`${buttonClass} arrow-btn`}></button>
        <button onClick={nextHandle} className={`${buttonClass} arrow-btn`}></button>
    </div>
  )
}

export default ButtonsArrow