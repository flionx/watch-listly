import { FC } from 'react';
import ProfileListCard from '../ProfileListCard/ProfileListCard';
import nolistImage from '/profilePage/nolist.png'
import './ProfileUserLists.css'
import { IUserList } from '@/types/user';
interface Props {
    isCurrentUser: boolean,
    lists: IUserList[],
    id: string
}

const ProfileUserLists:FC<Props> = ({isCurrentUser, lists, id}) => {

    return (
    <section className='profile-main__lists user-lists'>
        <div className="user-lists__title">{isCurrentUser ? 'My' : 'User'} lists</div>
        <div className="user-lists__row">
            {lists.length > 0 ? 
                lists.map(list => (
                    <ProfileListCard key={list.id} list={list} id={id}/>
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