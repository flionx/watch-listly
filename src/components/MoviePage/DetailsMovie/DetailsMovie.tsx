import { FC } from 'react'
import dateIcon from '/moviePage/date.svg?url'
import clockIcon from '/moviePage/clock.svg?url'
import countryIcon from '/moviePage/country.svg?url'
import moneyIcon from '/moviePage/money.svg?url'
import seasonIcon from '/moviePage/seasons.svg?url'
import seriesIcon from '/moviePage/series.svg?url'
import DetailRow from './DetailRow'
import { IMovie } from '@/types/movies'
import { TMovieMediaType } from '@/types/global'
interface Props {
    movie: IMovie,
    type: TMovieMediaType
}

const DetailsMovie:FC<Props> = ({movie, type}) => {
  return (
    <>
        {type === 'tv' && 
        <>
            {movie.number_of_seasons && <DetailRow icon={seasonIcon}>{movie.number_of_seasons} seasons</DetailRow>}
            {movie.number_of_episodes && <DetailRow icon={seriesIcon}>{movie.number_of_episodes} series</DetailRow>}
        </>}
        {movie.production_countries && movie.production_countries.length > 0 && 'name' in movie.production_countries[0] &&
            <DetailRow icon={countryIcon}>
                {movie.production_countries[0].name}
            </DetailRow>
        }
        <DetailRow icon={dateIcon}>{type === 'movie' ? movie.release_date : movie.first_air_date}</DetailRow>
        {movie.runtime > 0 && <DetailRow icon={clockIcon}>{calcTime(movie.runtime)}</DetailRow>}
        {movie.budget > 0 && <DetailRow icon={moneyIcon}>{movie.budget}</DetailRow>}
    </>
  )
}

export default DetailsMovie

function calcTime(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours > 10 ? hours : '0'+ hours}h ${minutes}m`
}