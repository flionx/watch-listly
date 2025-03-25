import { FC, RefObject } from 'react'
import './ButtonsArrow.css'
interface Props {
  parentClass: string,
  buttonClass: string,
  listRef: RefObject<HTMLDivElement | null>,
  cardWith: number,
  countScroll: number,
}

const ButtonsArrow: FC<Props> = ({parentClass, buttonClass, listRef, cardWith, countScroll}) => {
  
  const scrollList = (toLeft: boolean) => {
    if (!listRef.current) return;    
    listRef.current.scrollBy({
      left: toLeft ? -(cardWith * countScroll) : (cardWith * countScroll),
      behavior:'smooth'
    })
  }

  return (
    <div className={parentClass}>
        <button onClick={() => scrollList(true)} className={`${buttonClass} arrow-btn`}></button>
        <button onClick={() => scrollList(false)} className={`${buttonClass} arrow-btn`}></button>
    </div>
  )
}

export default ButtonsArrow