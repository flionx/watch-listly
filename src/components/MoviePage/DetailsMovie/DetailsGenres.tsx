import { IMovieGenre } from '@/types/movies'
import { FC } from 'react'
import styles from './index.module.css'
interface Props {
    genres: IMovieGenre[]
}

const DetailsGenres:FC<Props> = ({genres}) => {
  return (
    <div className={styles.genres}>
        {genres.map(genre => (
            <div key={genre.id} className={styles.genre}>{genre.name}</div>
        ))}
    </div>
  )
}

export default DetailsGenres