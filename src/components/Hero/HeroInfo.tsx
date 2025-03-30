import { FC } from "react"
import { IMovie } from "@/types/movies"
import ButtonHero from "@/ui/ButtonHero/ButtonHero"
import { Link } from "react-router-dom"
import VoteCount from "../VoteCount/VoteCount"
import { formatDate } from "@/utils/formatInfo"
interface Props {
    movie: IMovie
}

const HeroInfo:FC<Props> = ({movie}) => {
  return (
    <div className="hero__info">
        <h2 className="hero__title">{movie?.title || movie?.name}</h2>
        <div className="hero__info-info">
            {movie.vote_average > 0 && <VoteCount vote={movie.vote_average} count={movie.vote_count} />}
            {movie.release_date && <>
                {movie.vote_average > 0 && <span>|</span>}
                <div className="hero__year">{formatDate(movie.release_date)}</div>
            </>}
        </div>
        <p className="hero__text">{movie?.overview}</p>
        <div className="hero__info-btns">
            <Link to={`/${movie.media_type}/${movie.id}`}>
                <ButtonHero noBg onClick={() => {}}>Learn more</ButtonHero>
            </Link>
            <ButtonHero icon='triangle' onClick={() => {}}>Watch trailer</ButtonHero>
            <ButtonHero icon='plus' onClick={() => {}}>Add to list</ButtonHero>
        </div>
    </div>
  )
}


export default HeroInfo