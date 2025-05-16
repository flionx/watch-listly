import { useParams } from 'react-router-dom'
import useFetchList, { IUseFetchListProps } from '@/hooks/useFetchList';
import getImageUrl from '@/utils/getImageUrl';
import '@/app/styles/css/listPage.css'

const ListPage = () => {
  const {userId, listType, key} = useParams();
  const {isCurrentUser, loading, list} = useFetchList({id: userId, listType, key} as IUseFetchListProps);
    
  return (
    <>
      <ul className="list">
          {!loading && list.map(({movie}) => (
              <li key={movie.id}>
                <img src={getImageUrl(movie.poster_path)} alt="movie poster" />
                {movie.name ?? movie.title}
              </li>
          ))}
      </ul>
    </>
  )
}

export default ListPage