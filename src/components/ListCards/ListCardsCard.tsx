import { FC } from 'react';
import { TSetState } from '@/types/global';
import { IMovie } from '@/types/movies';
import getColor from '@/utils/getColorVote';
import getImageUrl from '@/utils/getImageUrl';
import { Link } from 'react-router-dom';
interface Props {
    movie: IMovie,
    index: number,
    hero: boolean,
    voting: boolean,
    select?: {
        selectMovie: number,
        setSelectMovie: TSetState<number>,
    },
}

const ListCardsCard: FC<Props> = ({movie, index, hero, voting, select}) => {
    const cardClass = ((index: number) => (index === select?.selectMovie) ? 'hero__card-active' : '');
    
  return hero ? (
        <button 
            className={`card-list__card ${hero ? 'hero__card ' + cardClass(index) : ''}`}
            key={movie.id} 
            onClick={select ? () => select?.setSelectMovie(index) :
                () => {}
            }
        >
            {voting && movie.vote_average > 0 && 
                <div className="card-list__vote"
                    style={{background: getColor(movie?.vote_average)}}>
                    {movie.vote_average.toFixed(1)}
                </div>}
            <img src={`${getImageUrl(movie.poster_path, 'w300')}`} alt='movie poster image' />
        </button>
    ) : (
        <Link to={`/${movie.media_type ?? 'movie'}/${movie.id}`} 
            className={`card-list__card ${hero ? 'hero__card ' + cardClass(index) : ''}`}
            key={movie.id} >
                {voting && movie.vote_average > 0 && 
                <div className="card-list__vote"
                    style={{background: getColor(movie?.vote_average)}}>
                    {movie.vote_average.toFixed(1)}
                </div>}
                <img src={`${getImageUrl(movie.poster_path, 'w300')}`} alt='movie poster image' />
        </Link>
    )
}

export default ListCardsCard