import { FC, useState } from "react"
import { Link } from "react-router-dom"
import { formatDate } from "@/utils/formatInfo"
import ButtonHero from "@/ui/ButtonHero/ButtonHero"
import { StarVoteCount } from "../VoteCount/VoteCount"
import ModalAddToList from "../ModalAddToList/ModalAddToList"
import { IMovie } from "@/types/movies"
import { TitleSubBig } from "@/ui/Text/Text"
import useModalAdd from "@/hooks/useModalAdd"
import getMovieType from "@/utils/getMovieType"
interface Props {
    movie: IMovie
}

const HeroInfo:FC<Props> = ({movie}) => {
    const {modalAdd, showModalAdd, hideModalAdd} = useModalAdd(movie);
    
  return (
    <>
    <div className="hero__info">
        <h2 className="hero__title"><TitleSubBig>{movie?.title || movie?.name}</TitleSubBig></h2>
        <div className="hero__info-info">
            {movie.vote_average > 0 && <StarVoteCount vote={movie.vote_average} count={movie.vote_count} />}
            {movie.release_date && <>
                {movie.vote_average > 0 && <span>|</span>}
                <div className="hero__year">{formatDate(movie.release_date)}</div>
            </>}
        </div>
        <p className="hero__text">{movie?.overview}</p>
        <div className="hero__info-btns">
            <Link to={`/${movie.media_type ?? getMovieType(movie.first_air_date)}/${movie.id}`}>
                <ButtonHero noBg onClick={() => {}}>Learn more</ButtonHero>
            </Link>
            <ButtonHero icon='triangle' onClick={() => {}}>Watch trailer</ButtonHero>
            <ButtonHero icon='plus' onClick={showModalAdd}>Add to list</ButtonHero>
        </div>
    </div>
    {modalAdd.show && <ModalAddToList movie={modalAdd.movie!} closeModal={hideModalAdd}/>}
    </>
  )
}


export default HeroInfo