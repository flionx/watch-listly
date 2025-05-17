import WideListSection from "@/components/WideListSection/WideListSection";
import LoadingMoviePage from "@/components/Loading/LoadingPage/MoviePage/LoadingMoviePage";
import HeroMovie from "@/components/MoviePage/HeroMovie/HeroMovie";
import InfoMoviePage from "@/components/MoviePage/InfoMoviePage/InfoMoviePage";
import useMoviePage from "@/hooks/useMoviePage";
import '@/app/styles/css/moviePage.css';

const MoviePage = () => {
    const {movie, loading, type} = useMoviePage();

  return (
    <>
        {loading === 'pending' && <LoadingMoviePage />}
        {(loading === 'succeeded') &&
        <>
            <HeroMovie movie={movie}/>
            <section className="movie-main">

                <InfoMoviePage movie={movie} type={type!} />

                <div className="movie-main__list">
                    <WideListSection title='See also'
                        path='movie/now_playing' storageKey="movies-watching"
                        padding={false}
                        type="movie"
                    />  
                </div>
            </section>  
        </>}
    </>)
}

export default MoviePage