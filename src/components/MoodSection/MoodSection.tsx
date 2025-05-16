import { Ref, useRef } from 'react'
import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import ButtonsArrow from '@/ui/ButtonsArrow/ButtonsArrow'
import { moodCardWith } from '@/app/constants/movies'
import { moodList } from './moodList'
import './MoodSection.css'
import { TitleUnderline } from '@/ui/Text/Text'

const MoodSection = () => {
    const listRef = useRef<HTMLDivElement>(null);

  return (
    <section className='mood'>
        <div className="mood-container">
            <div className="mood__content">
                <h3><TitleUnderline>What’s your mood today?</TitleUnderline></h3>
                <div className="mood__arrows">
                    <ButtonsArrow
                        parentClass="arrows-full-w"
                        buttonClass="arrow-circle arrow-btn"
                        cardWith={moodCardWith}
                        listRef={listRef}
                        countScroll={1}
                    />
                </div>
                <div className="mood__cards list-scroll" 
                    ref={listRef as Ref<HTMLDivElement>}
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