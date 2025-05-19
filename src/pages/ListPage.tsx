import { useParams } from 'react-router-dom'
import useFetchList, { IUseFetchListProps } from '@/hooks/useFetchList';
import { TitleBig} from '@/ui/Text/Text';
import ListCard from '@/components/ListPage/ListCard/ListCard';
import '@/app/styles/css/listPage.css'

const ListPage = () => {
  const {userId, listType, key} = useParams();
  const {isCurrentUser, loading, list, listName} = useFetchList({id: userId, listType, key} as IUseFetchListProps);

  return (
    <>
      <section className='banner'>
        <h1><TitleBig>{listName}</TitleBig></h1>
      </section>
      <ul className="list">
          {!loading && list.map(({movie, rate}, index) => (
              <ListCard 
                key={movie.id}
                userId={userId!}
                listType={listType!}
                listKey={key!}
                movie={movie}
                rate={rate}
                isCurrentUser={isCurrentUser}
                index={index}
              />
          ))}
      </ul>
    </>
  )
}

export default ListPage
