import { FC } from 'react'
import { IMovie } from '@/types/movies'
import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import getImageUrl from '@/utils/getImageUrl'
import shareLink from '@/utils/shareLink'
import { TitleBig } from '@/ui/Text/Text'
import useModalAdd from '@/hooks/useModalAdd'
import ModalAddToList from '@/components/ModalAddToList/ModalAddToList'
interface Props {
    movie: IMovie
}

const HeroMovie: FC<Props> = ({movie}) => {
  const {modalAdd, showModalAdd, hideModalAdd} = useModalAdd(movie);

  return (
    <section className="movie-page-hero"
    style={{
        backgroundImage: `url(${getImageUrl(movie?.backdrop_path, 'original')})`}}>
        <div className="movie-page-hero__hello">
            <h2><TitleBig>{movie.title ?? movie.name}</TitleBig></h2>
            <div className="movie-page-hero__btns">
                <ButtonHero icon='plus' onClick={showModalAdd}>Add to list</ButtonHero>
                <ButtonHero noBg icon='share'
                  onClick={() => shareLink(window.location.href)}>
                  Share
                </ButtonHero>
            </div>
        </div>
      {modalAdd.show && <ModalAddToList movie={modalAdd.movie!} closeModal={hideModalAdd}/>}
    </section>
  )
}

export default HeroMovie