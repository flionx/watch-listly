import { IMovieGenre } from '@/types/movies'
import { FC } from 'react'
interface Props {
    genres: IMovieGenre[]
}

const DetailsGenres:FC<Props> = ({genres}) => {
  return (
    <div className="details-movie__genres">
        {genres.map(genre => (
            <div key={genre.id} className="details-movie__genre">{genre.name}</div>
        ))}
    </div>
  )
}

export default DetailsGenres