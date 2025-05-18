import { FC, ReactNode, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeMovieRate, IChangeMovieRateParams, IToggleMovieInListParams, toggleMovieInList } from '@/app/store/slices/userSlice';
import useFetchList, { IUseFetchListProps } from '@/hooks/useFetchList';
import getImageUrl from '@/utils/getImageUrl';
import { TextGray, TitleBig, TitleMiddle, TitleSmall } from '@/ui/Text/Text';
import { formatDate } from '@/utils/formatInfo';
import { StarVote } from '@/components/VoteCount/VoteCount';
import { IMovie } from '@/types/movies';
import StarRating from '@/components/StarRating/StarRating';
import '@/app/styles/css/listPage.css'
import getMovieType from '@/utils/getMovieType';

const ListPage = () => {
  const {userId, listType, key} = useParams();
  const dispatch = useAppDispatch();
  const {isCurrentUser, loading, list, listName} = useFetchList({id: userId, listType, key} as IUseFetchListProps);
  const seenList = useAppSelector(state => state.user.seenList);
  const [modalRateId, setModalRateId] = useState<number | null>(null)

  function isInSeenList(id: number) {
    return !!seenList.find(list => list.movie.id === id)
  }

  function toggleSeenIt(movie: IMovie) {
    const toggledMovie: IToggleMovieInListParams = {
        movie,
        listkey: 'seenList',
        type: 'basic',
        action: isInSeenList(movie.id) ? 'remove' : 'add'
    }
    dispatch(toggleMovieInList(toggledMovie));
  }

  function toggleModalRateId(id: number) {
    setModalRateId(modalRateId === id ? null : id)
  }

  function handleChangeMovieRate(id: number, rateCount: number) {
    dispatch(changeMovieRate({
      listkey: key,
      type: listType,
      movieId: id,
      value: rateCount === 0 ? null : rateCount
    } as IChangeMovieRateParams));
  }

  return (
    <>
      <section className='banner'>
        <h1><TitleBig>{listName}</TitleBig></h1>
      </section>
      <ul className="list">
          {!loading && list.map(({movie, rate}, index) => (
              <li className='list__card' key={movie.id}>
                <TitleMiddle>{index + 1}</TitleMiddle>
                <Link to={`/${movie.media_type ?? getMovieType(movie.first_air_date)}/${movie.id}`} className='card__image'>
                  <img src={getImageUrl(movie.poster_path)} alt="movie poster" />
                </Link>
                <div className="card__info">
                  <Link to={`/${movie.media_type ?? getMovieType(movie.first_air_date)}/${movie.id}`} className='card__name'>
                    <TitleSmall>{movie.name ?? movie.title}</TitleSmall>
                  </Link>
                  <TextGray>{formatDate(movie.first_air_date ?? movie.release_date)}</TextGray>
                  {movie.vote_average > 0 && <StarVote vote={movie.vote_average} />}
                  {rate && <TextGray>Your rate: {rate}</TextGray>}
                </div>
                <div className="card__btns">
                  <ButtonGray handleClick={() => toggleSeenIt(movie)}>
                    {isInSeenList(movie.id) && <span className='check'></span>}
                    Seen it
                  </ButtonGray>
                  <div className="star-block">
                    <ButtonGray noPadding handleClick={() => toggleModalRateId(movie.id)}>
                      <span className={`star ${rate ? 'fill' : ''}`}></span>
                    </ButtonGray>
                    {modalRateId === movie.id && 
                      <div className={`modal-rate ${rate ? 'small' : ''}`}>
                      <StarRating select={rate ?? 0} handleClick={
                        (rateCount: number) => handleChangeMovieRate(movie.id, rateCount)
                      }/>
                    </div>
                    }
                  </div>
                  <div className="more-block">
                    <ButtonGray noPadding transparent handleClick={() => {}}>
                      <span className='more'></span>
                    </ButtonGray>
                  </div>
                </div>
              </li>
          ))}
      </ul>
    </>
  )
}

export default ListPage

interface ButtonProps {
  children: ReactNode,
  handleClick: VoidFunction,
  noPadding?: boolean,
  transparent?: boolean
}
const ButtonGray: FC<ButtonProps> = ({children, handleClick, noPadding, transparent}) => {
  return (
    <button className={`button-gray ${!noPadding ? 'btn-p' : ''} ${transparent ? 'transparent' : ''} `} 
      onClick={handleClick}>
      {children}
    </button>
  )
}
