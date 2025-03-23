import { moodList } from "./moodlist"
import './MoodSection.css'

const MoodSection = () => {
  return (
    <section className='mood'>
        <div className="mood-container">
            <div className="mood__content">
                <h3 className="card-list__title">What’s your mood today?</h3>
                <div className="mood__cards">
                    {moodList.map((card) => (
                        <button key={card.text}
                            style={{backgroundImage: `url(${card.img})`}}
                        >
                            <div className="mood__card-text">{card.text}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </section>
  )
}

export default MoodSection