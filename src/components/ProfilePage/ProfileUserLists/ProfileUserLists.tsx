import { useAppSelector } from '@/hooks/useRedux'
import ProfileListCard from '../ProfileListCard/ProfileListCard';
import nolistImage from '/profilePage/nolist.png'
import './ProfileUserLists.css'

const ProfileUserLists = () => {
    const lists = useAppSelector(state => state.user.lists);
  return (
    <section className='profile-main__lists user-lists'>
        <div className="user-lists__title">My lists</div>
        <div className="user-lists__row">
            {lists.length > 0 ? 
                lists.map(list => (
                    <ProfileListCard key={list.id} list={list}/>
                ))
            :
                <ProfileListCard key={0} 
                    image
                    list={{
                        id: 0,
                        poster: nolistImage,
                        name: 'There are no lists',
                        color: '#1f535f',
                        movies: []
                    }}
                />
            }
        </div>
    </section>
  )
}

export default ProfileUserLists;