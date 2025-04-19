import { FC } from 'react'
import { IMovie } from '@/types/movies'
import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import getImageUrl from '@/utils/getImageUrl'
import shareLink from '@/utils/shareLink'
interface Props {
    movie: IMovie
}

const HeroMovie: FC<Props> = ({movie}) => {

  return (
    <section className="movie-page-hero"
    style={{
        backgroundImage: `url(${getImageUrl(movie?.backdrop_path, 'original')})`}}>
        <div className="movie-page-hero__hello">
            <h2 className="movie-page-hero__title">{movie.title ?? movie.name}</h2>
            <div className="movie-page-hero__btns">
                <ButtonHero icon='plus' onClick={() => {}}>Add to list</ButtonHero>
                <ButtonHero noBg icon='share'
                  onClick={() => shareLink(window.location.href)}>
                  Share
                </ButtonHero>
            </div>
        </div>
    </section>
  )
}

export default HeroMovie