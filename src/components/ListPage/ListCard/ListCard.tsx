import { FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { Link, useNavigate } from 'react-router-dom'
import { changeMovieRate, IChangeMovieRateParams, IToggleMovieInListParams, toggleMovieInList } from '@/app/store/slices/userSlice'
import { StarVote } from '@/components/VoteCount/VoteCount'
import { TextGray, TitleMiddle, TitleSmall } from '@/ui/Text/Text'
import { formatDate } from '@/utils/formatInfo'
import getImageUrl from '@/utils/getImageUrl'
import getMovieType from '@/utils/getMovieType'
import ModalMore from '@/components/ModalMore/ModalMore'
import StarRating from '@/components/StarRating/StarRating'
import { IMovie } from '@/types/movies'
import ButtonGray from '@/ui/ButtonGray/ButtonGray'
interface IModalInfo {
  id: number | null, 
  type: 'rate' | 'more' | null
}
interface Props {
    userId: string,
    listType: string, 
    listKey: string,
    movie: IMovie,
    rate: number | null, 
    isCurrentUser: boolean,
    index: number
}
const ListCard:FC<Props> = ({userId, listType, listKey, movie, rate, isCurrentUser, index}) => {        
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [modalInfo, setModalInfo] = useState<IModalInfo>({id: null, type: null});
    const seenList = useAppSelector(state => state.user.seenList);
    const moviePagePath = `/${movie.media_type ?? getMovieType(movie.first_air_date)}/${movie.id}`;

    function isInSeenList(id: number) {
        return !!seenList.find(list => list.movie.id === id)
    }
    
    function toggleSeenIt(movie: IMovie) {
        const toggledMovie: IToggleMovieInListParams = {
            movie,
            listKey: 'seenList',
            type: 'basic',
            action: isInSeenList(movie.id) ? 'remove' : 'add'
        }
        dispatch(toggleMovieInList(toggledMovie));
    }

    function toggleModalInfo(id: number, type: IModalInfo['type']) {
        setModalInfo({
            id: (modalInfo?.id === id && modalInfo?.type === type) ? null : id, 
            type
        })
    }

    function handleChangeMovieRate(id: number, rateCount: number) {
        dispatch(changeMovieRate({
            listKey,
            type: listType,
            movieId: id,
            value: rateCount === 0 ? null : rateCount
        } as IChangeMovieRateParams));
    }

  return (
    <li className='list__card' key={movie.id}>
        <TitleMiddle>{index + 1}</TitleMiddle>
        <Link to={moviePagePath} className='card__image'>
            <img src={getImageUrl(movie.poster_path)} alt="movie poster" />
        </Link>
        <div className="card__info">
            <Link to={moviePagePath} className='card__name'>
            <TitleSmall>{movie.name ?? movie.title}</TitleSmall>
            </Link>
            <TextGray>{formatDate(movie.first_air_date ?? movie.release_date)}</TextGray>
            {movie.vote_average > 0 && <StarVote vote={movie.vote_average} />}
            {rate && <TextGray>Your rate: {rate}</TextGray>}
        </div>
        <div className="card__btns">
            {isCurrentUser && <>
                <ButtonGray handleClick={() => toggleSeenIt(movie)}>
                    {isInSeenList(movie.id) && <span className='check'></span>}
                    Seen it
                </ButtonGray>
                <div className="star-block">
                    <ButtonGray noPadding handleClick={() => toggleModalInfo(movie.id, 'rate')}>
                        <span className={`star ${rate ? 'fill' : ''}`}></span>
                    </ButtonGray>
                    {(modalInfo?.id === movie.id && modalInfo.type === 'rate') && 
                        <div className={`modal-rate ${rate ? 'small' : ''}`}>
                            <StarRating select={rate ?? 0} 
                                handleClick={(rateCount: number) => handleChangeMovieRate(movie.id, rateCount)}
                                />
                        </div>
                    }
                </div>
            </>}
            <div className="more-block">
                <ButtonGray noPadding transparent handleClick={() => toggleModalInfo(movie.id, 'more')}>
                    <span className='more'></span>
                </ButtonGray>
                {(modalInfo?.id === movie.id && modalInfo.type === 'more') &&
                    <ModalMore>
                        <button onClick={() => {navigate(moviePagePath)}}>
                            Visit movie page
                        </button>
                        {isCurrentUser && <>
                            <button className='star-block' 
                                onClick={() => toggleModalInfo(movie.id, 'rate')}
                            >
                                Rate the movie
                            </button>
                            <button onClick={() => {
                                dispatch(toggleMovieInList({
                                movie,
                                listKey,
                                type: listType,
                                action: 'remove'
                                } as IToggleMovieInListParams))
                            }}>Remove</button>
                        </>}
                    </ModalMore>
                }
                <div className="star-mobile">
                    {(modalInfo?.id === movie.id && modalInfo.type === 'rate') && 
                    <div className={`modal-rate ${rate ? 'small' : ''}`}>
                        <StarRating select={rate ?? 0} handleClick={
                            (rateCount: number) => handleChangeMovieRate(movie.id, rateCount)
                        }/>
                    </div>
                    }
                </div>
            </div>
        </div>
    </li>
  )
}

export default ListCard