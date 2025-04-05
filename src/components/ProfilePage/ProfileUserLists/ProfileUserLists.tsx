import { useAppSelector } from '@/hooks/useRedux'
import ProfileListCard from '../ProfileListCard/ProfileListCard';
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
                <p>You dont have lists</p>
            }
        </div>
    </section>
  )
}

export default ProfileUserLists;