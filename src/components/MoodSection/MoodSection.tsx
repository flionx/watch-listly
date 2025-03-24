import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import { moodList } from './moodList'
import './MoodSection.css'
import ButtonsArrow from '@/ui/ButtonsArrow/ButtonsArrow'
import useSpinStep from '@/hooks/useSpinStep'
import { Ref } from 'react'
import { moodCardWith } from '@/app/constants/movies'

const MoodSection = () => {
    const {countSpin, maxSteps, listRef, setCountSpin} = useSpinStep(moodList, 1, moodCardWith);

  return (
    <section className='mood'>
        <div className="mood-container">
            <div className="mood__content">
                <h3 className="card-list__title">What’s your mood today?</h3>
                <div className="mood__arrows">
                    <ButtonsArrow
                        parentClass="arrows-full-w"
                        buttonClass="arrow-circle arrow-btn"
                        maxSteps={maxSteps}
                        setCountSpin={setCountSpin}
                    />
                </div>
                <div className="mood__cards" 
                    ref={listRef as Ref<HTMLDivElement>}
                    style={{transform: `translateX(-${countSpin * moodCardWith}px)`}}
                >
                    {moodList.map((card) => (
                        <button key={card.text}
                            style={{backgroundImage: `url(${card.img})`}}
                        >
                            <div className="mood__card-text">{card.text}</div>
                        </button>
                    ))}
                </div>
                <div className="mood__btns">
                    <ButtonHero noBg onClick={() => {}}>Random movie</ButtonHero>
                    <ButtonHero onClick={() => {}}>Random mood</ButtonHero>
                </div>
            </div>
        </div>
    </section>
  )
}

export default MoodSection