import { useEffect } from 'react'
import ProfileHeader from '@/components/ProfilePage/ProfileHeader/ProfileHeader'
import ProfileWideCard from '@/components/ProfilePage/ProfileWideCard/ProfileWideCard'
import ProfileCreateList from '@/components/ProfilePage/ProfileCreateList/ProfileCreateList'
import ProfileUserLists from '@/components/ProfilePage/ProfileUserLists/ProfileUserLists'
import ProfileSelect from '@/components/ProfilePage/ProfileSelect/ProfileSelect'
import { useParams } from 'react-router-dom'
import useFetchUser from '@/hooks/useFetchUser'
import '@/app/styles/css/profilePage.css'

const ProfilePage = () => {
  const {id} = useParams();
  const {user, loading, fetchUser} = useFetchUser();

  useEffect(() => {
    if (!id) return;

    fetchUser(id);
  }, [id])

  return (
    <section className="profile-main">
      {!loading && !user && <p>Error, there is no such user</p>}
      {!loading && user && <>
        <ProfileHeader 
          id={user.id} 
          username={user.username} 
          cover={user.cover}
        />
        <div className="profile-main__cards-wide">
            <ProfileWideCard title='Seen it'/>
            <ProfileWideCard title='Want to see it'/>
        </div>
        <ProfileCreateList />
        <ProfileUserLists />
        <div className="profile-main__column">
            <ProfileSelect visibility>Who can see your lists?</ProfileSelect>
            <ProfileSelect lists={user.lists}>Would you like to remove a list?</ProfileSelect>
        </div>
      </>}
    </section>
  )
}

export default ProfilePage