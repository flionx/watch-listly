import { FC, useEffect, useState } from 'react'
import { TSetState } from '../../types/global';
interface Props {
    spin: {
        spinCount : number,
        setSpinCount: TSetState<number>,
    },
    hideCards: {
        hiddenCards: number,
        setHiddenCards: TSetState<number>
    },
    heroRef: React.RefObject<HTMLElement | null>,
    oneScroll: number,
}

const HeroArrows:FC<Props> = ({heroRef, oneScroll, spin, hideCards}) => {
    const [initialHidden, setInitianHidden] = useState(0)
    const {spinCount, setSpinCount} = spin;
    const {hiddenCards, setHiddenCards} = hideCards;
    
    useEffect(() => {
        if (heroRef.current) {            
            const width = heroRef.current.getBoundingClientRect().width;
            setHiddenCards(20 - Math.floor(width / oneScroll));    
            setInitianHidden(20 - Math.floor(width / oneScroll))        
        }
    }, []);

    const nextHandle = () => {
        if (hiddenCards > 0) {
            setSpinCount(curr => curr + 2)
            setHiddenCards(curr => curr - 2)
        }
    }
    const prevHandle = () => {        
        if (hiddenCards < initialHidden) {
            setSpinCount(curr => curr - 2)
            setHiddenCards(curr => curr + 2)
        }
    }

  return (
    <div className='hero__arrows'>
        <button onClick={prevHandle} className='hero__arrow-btn'></button>
        <button onClick={nextHandle} className='hero__arrow-btn'></button>
    </div>
  )
}

export default HeroArrows