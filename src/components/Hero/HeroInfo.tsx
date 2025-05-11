import { FC, useState } from "react"
import { Link } from "react-router-dom"
import { formatDate } from "@/utils/formatInfo"
import ButtonHero from "@/ui/ButtonHero/ButtonHero"
import VoteCount from "../VoteCount/VoteCount"
import ModalAddToList from "../ModalAddToList/ModalAddToList"
import { IMovie } from "@/types/movies"
interface Props {
    movie: IMovie
}
interface IModalAdd {
    show: boolean,
    movie: IMovie | null,
}

const HeroInfo:FC<Props> = ({movie}) => {
    const [modalAdd, setModalAdd] = useState<IModalAdd>({
        show: false,
        movie: null,
    });
    function showModalAdd() {
        setModalAdd({movie: movie, show: true})        
    }
    function hideModalAdd() {
        setModalAdd(c => ({...c, show: false})) 
    }
    
  return (
    <>
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
            <ButtonHero icon='plus' onClick={showModalAdd}>Add to list</ButtonHero>
        </div>
    </div>
    {modalAdd.show && <ModalAddToList movie={modalAdd.movie!} closeModal={hideModalAdd}/>}
    </>
  )
}


export default HeroInfo