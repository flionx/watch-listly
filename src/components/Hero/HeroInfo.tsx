import { FC } from "react"
import { IMovie } from "@/types/movies"
import ButtonHero from "@/ui/ButtonHero/ButtonHero"
import getColor from "@/utils/getColorVote"
import { Link } from "react-router-dom"
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
            {movie?.release_date && <span>|</span>}
            <div className="hero__year">{movie?.release_date}</div>
            {/* <div className="hero__genres">comedy</div> */}
        </div>
        <p className="hero__text">{movie?.overview}</p>
        <div className="hero__info-btns">
            <Link to={`movie/${movie.id}`}>
                <ButtonHero noBg onClick={() => {}}>Learn more</ButtonHero>
            </Link>
            <ButtonHero icon='triangle' onClick={() => {}}>Watch trailer</ButtonHero>
            <ButtonHero icon='plus' onClick={() => {}}>Add to list</ButtonHero>
        </div>
    </div>
  )
}


export default HeroInfo