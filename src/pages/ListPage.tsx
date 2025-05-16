import { useParams } from 'react-router-dom'
import useFetchList, { IUseFetchListProps } from '@/hooks/useFetchList';
import getImageUrl from '@/utils/getImageUrl';
import { TitleBig, TitleMiddle, TitleSmall } from '@/ui/Text/Text';
import '@/app/styles/css/listPage.css'
import { formatDate } from '@/utils/formatInfo';

const ListPage = () => {
  const {userId, listType, key} = useParams();
  const {isCurrentUser, loading, list, listName} = useFetchList({id: userId, listType, key} as IUseFetchListProps);
    
  return (
    <>
      <section className='banner'>
        <h1><TitleBig>{listName}</TitleBig></h1>
      </section>
      <ul className="list">
          {!loading && list.map(({movie}, index) => (
              <li className='list__card' key={movie.id}>
                <TitleMiddle>{index + 1}</TitleMiddle>
                <img src={getImageUrl(movie.poster_path)} alt="movie poster" />
                <div className="list__info">
                  <TitleSmall>{movie.name ?? movie.title}</TitleSmall>
                  <p>{formatDate(movie.first_air_date ?? movie.release_date)}</p>
                  
                </div>
              </li>
          ))}
      </ul>
    </>
  )
}

export default ListPage