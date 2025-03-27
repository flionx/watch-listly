import { FC } from 'react'
import dateIcon from '/moviePage/date.svg?url'
import clockIcon from '/moviePage/clock.svg?url'
import countryIcon from '/moviePage/country.svg?url'
import moneyIcon from '/moviePage/money.svg?url'
import DetailRow from './DetailRow'
import { IMovie } from '@/types/movies'
interface Props {
    movie: IMovie,
}

const DetailsMovie:FC<Props> = ({movie}) => {
  return (
    <>
        <DetailRow icon={dateIcon}>{movie.release_date}</DetailRow>
        {movie.runtime > 0 && <DetailRow icon={clockIcon}>{calcTime(movie.runtime)}</DetailRow>}
        {movie.production_countries.length > 0 && 'name' in movie.production_countries[0] &&
            <DetailRow icon={countryIcon}>
                {movie.production_countries[0].name}
            </DetailRow>
        }
        <DetailRow icon={moneyIcon}>{movie.release_date}</DetailRow>
    </>
  )
}

export default DetailsMovie

function calcTime(mins: number): string {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours > 10 ? hours : '0'+ hours}h ${minutes}m`
}