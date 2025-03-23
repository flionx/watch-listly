import HeroInfo from './HeroInfo';
import getImageUrl from '@/utils/getImageUrl';
import ButtonsArrow from '@/ui/ButtonsArrow/ButtonsArrow';
import useManageHero from '@/hooks/useManageHero';
import ListCards from '../ListCards/ListCards';
import './Hero.css'

const Hero = () => {
    const {
        movies, selectMovie, setSelectMovie, loading, 
        countSpin, setCountSpin, maxSteps, heroRef, listRef
    } = useManageHero();

  return (
    <section className="hero" ref={heroRef} 
        style={{backgroundImage: `url(${getImageUrl(movies[selectMovie]?.backdrop_path, 'original')})`}}>
        {loading === 'pending' && <p>Загрузка</p>}

        {movies.length > 0 && 
        <>
            <HeroInfo movie={movies[selectMovie]}/>
            <ButtonsArrow 
                parentClass='hero__arrows'
                buttonClass='hero__arrows-btn'
                maxSteps={maxSteps}
                setCountSpin={setCountSpin}
            />
            <ListCards
                hero
                listRef={listRef} 
                movies={movies} 
                countSpin={countSpin}
                select={{selectMovie, setSelectMovie}} 
            />
        </>}
    </section>
  )
}

export default Hero