import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/useRedux'
import { useParams } from 'react-router-dom'
import ProfileHeader from '@/components/ProfilePage/ProfileHeader/ProfileHeader'
import ProfileWideCard from '@/components/ProfilePage/ProfileWideCard/ProfileWideCard'
import ProfileCreateList from '@/components/ProfilePage/ProfileCreateList/ProfileCreateList'
import ProfileUserLists from '@/components/ProfilePage/ProfileUserLists/ProfileUserLists'
import ProfileSelect from '@/components/ProfilePage/ProfileSelect/ProfileSelect'
import LoadingProfilePage from '@/components/Loading/LoadingPage/ProfilePage/LoadingProfilePage'
import useFetchUser from '@/hooks/useFetchUser'
import '@/app/styles/css/profilePage.css'

const ProfilePage = () => {
  const {id} = useParams();
  const {user, loading, fetchUser} = useFetchUser();
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const currentUserLists = useAppSelector(state => state.user.lists)
  
  useEffect(() => {
    if (!id) return;

    fetchUser(id, setIsCurrentUser);
  }, [id])

  return (
    <section className="profile-main">
      {loading && <LoadingProfilePage user/>}
      {!loading && !user && <LoadingProfilePage user={false}/>}
      {!loading && user && <>
        <ProfileHeader 
          isCurrentUser={isCurrentUser}
          id={user.id} 
          username={user.username} 
          cover={user.cover}
          avatar={user.avatar}
        />
        <div className="profile-main__cards-wide">
            <ProfileWideCard title='Seen it'/>
            <ProfileWideCard title='Want to see it'/>
        </div>
        {isCurrentUser && <ProfileCreateList />}
        <ProfileUserLists isCurrentUser={isCurrentUser} lists={isCurrentUser ? currentUserLists : user.lists}/>
        {isCurrentUser && 
          <div className="profile-main__column">
              <ProfileSelect visibility>Who can see your lists?</ProfileSelect>
              <ProfileSelect lists={currentUserLists}>Would you like to remove a list?</ProfileSelect>
          </div>
        }
      </>}
    </section>
  )
}

export default ProfilePage