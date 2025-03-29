import { countScrollSmall, smallCardWith } from '@/app/constants/movies';
import ListCards from '../ListCards/ListCards';
import HeroInfo from './HeroInfo';
import getImageUrl from '@/utils/getImageUrl';
import ButtonsArrow from '@/ui/ButtonsArrow/ButtonsArrow';
import useManageHero from '@/hooks/useManageHero';
import LoadingMainPage from '../Loading/LoadingMainPage';
import './Hero.css'

const Hero = () => {
    const {movies, selectMovie, setSelectMovie, heroRef, listRef, loading} = useManageHero();

  return (
    <>
    {loading === 'pending' && <LoadingMainPage />}
    {(loading === 'idle' || loading === 'succeeded') && 
        <section className="hero" ref={heroRef} 
            style={{backgroundImage: `url(${getImageUrl(movies[selectMovie]?.backdrop_path, 'original')})`}}>
            {movies.length > 0 && 
            <>
                <HeroInfo movie={movies[selectMovie]}/>
                <ButtonsArrow 
                    parentClass='hero__arrows'
                    buttonClass='hero__arrows-btn'
                    listRef={listRef} 
                    countScroll={countScrollSmall}
                    cardWith={smallCardWith}
                />
                <ListCards
                    hero
                    listRef={listRef} 
                    movies={movies} 
                    select={{selectMovie, setSelectMovie}} 
                />
            </>}
        </section>}
    </>
  )
}

export default Hero