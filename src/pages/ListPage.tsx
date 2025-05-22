import { useParams } from 'react-router-dom'
import useFetchList, { IUseFetchListProps } from '@/hooks/useFetchList';
import { TitleSmall} from '@/ui/Text/Text';
import ListCard from '@/components/ListPage/ListCard/ListCard';
import DetailsSection from '@/components/MoviePage/DetailsMovie/DetailsSection';
import LineDetails from '@/components/MoviePage/DetailsMovie/LineDetails';
import DetailRowLink from '@/components/MoviePage/DetailsMovie/DetailRowLink';
import { useEffect } from 'react';
import { scrollToUpPage } from '@/utils/scrollToUpPage';
import '@/app/styles/css/listPage.css'
import ListBanner from '@/components/ListPage/ListBanner/ListBanner';

const ListPage = () => {
  const {userId, listType, key} = useParams();
  const { isCurrentUser, loading, list, listName, userLists } = useFetchList({id: userId, listType, key} as IUseFetchListProps);

  useEffect(() => {
    scrollToUpPage();
  }, [userId, listType, key])

  return (
    <>
      <ListBanner 
        listName={listName} 
        listKey={key!} 
        listType={listType!}
        userId={userId!}
        isCurrentUser={isCurrentUser}
      />
      <main className={isCurrentUser ? 'list-page-container' : 'list-page-main'}>
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
        {isCurrentUser && 
          <div className="details">
            <DetailsSection>
              {userLists?.length! > 0 &&
                <>
                  <h4><TitleSmall>Your Lists</TitleSmall></h4>
                  {userLists?.map(list => 
                    <DetailRowLink link={`/list/${userId}/user/${list.id}`} key={list.id}>
                      {list.name}
                    </DetailRowLink>
                  )}
                  <LineDetails />
                </>
              }
              <h4><TitleSmall>Basic Lists</TitleSmall></h4>
              <DetailRowLink link={`/list/${userId}/basic/seenList`}>Seen it</DetailRowLink>
              <DetailRowLink link={`/list/${userId}/basic/wantList`}>Want to see it</DetailRowLink>
            </DetailsSection>
          </div>
        }
      </main>
    </>
  )
}

export default ListPage
