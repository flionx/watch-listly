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
import { formatBudget, formatDate, formatTime } from '@/utils/formatInfo'
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
        {movie.production_countries?.[0]?.name &&
            <DetailRow icon={countryIcon}>
                {movie.production_countries[0].name}
            </DetailRow>
        }
        <DetailRow icon={dateIcon}>{formatDate(type === 'movie' ? movie.release_date : movie.first_air_date!)}</DetailRow>
        {Number(movie.runtime) > 0 && <DetailRow icon={clockIcon}>{formatTime(movie.runtime)}</DetailRow>}
        {Number(movie.budget) > 0  && <DetailRow icon={moneyIcon}>{formatBudget(movie.budget)}</DetailRow>}
    </>
  )
}

export default DetailsMovie