import { FC } from "react"
import { IMovie } from "../../types/movies"
import ButtonHero from "../Button/ButtonHero"
interface Props {
    movie: IMovie
}

const HeroInfo:FC<Props> = ({movie}) => {
  return (
    <div className="hero__info">
        <h2 className="hero__title">{movie?.title || movie?.name}</h2>
        <div className="hero__info-info">
            {movie?.vote_count > 0 && 
                <div className="hero__vote" style={{background: getColor(movie?.vote_average)}}
                >{movie?.vote_average.toFixed(1)}</div> }
            <div className="hero__vote-count">{'(' + movie?.vote_count + ')'}</div>
            <span>|</span>
            <div className="hero__year">{movie?.release_date}</div>
            {/* <div className="hero__genres">comedy</div> */}
        </div>
        <p className="hero__text">{movie?.overview}</p>
        <div className="hero__info-btns">
            <ButtonHero noBg onClick={() => {}}>Learn more</ButtonHero>
            <ButtonHero onClick={() => {}}>Watch trailer</ButtonHero>
            <ButtonHero onClick={() => {}}>Add to list</ButtonHero>
        </div>
    </div>
  )
}


export default HeroInfo

function getColor(vote: number) {
    if(vote >= 8) {
        return '#009E2A'
    } else if (vote >= 5) {
        return '#F2BC1A'
    } else {
        return '#A10000'
    }
}