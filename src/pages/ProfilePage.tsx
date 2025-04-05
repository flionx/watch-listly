import ProfileHeader from '@/components/ProfilePage/ProfileHeader/ProfileHeader'
import ProfileWideCard from '@/components/ProfilePage/ProfileWideCard/ProfileWideCard'
import ProfileCreateList from '@/components/ProfilePage/ProfileCreateList/ProfileCreateList'
import ProfileUserLists from '@/components/ProfilePage/ProfileUserLists/ProfileUserLists'
import ProfileSelect from '@/components/ProfilePage/ProfileSelect/ProfileSelect'
import '@/app/styles/css/profilePage.css'
import { useAppSelector } from '@/hooks/useRedux'

const ProfilePage = () => {
  const userLists = useAppSelector(state => state.user.lists);

  return (
    <section className="profile-main">
        <ProfileHeader />
        <div className="profile-main__row">
            <ProfileWideCard title='Seen it'/>
            <ProfileWideCard title='Want to see it'/>
        </div>
        <ProfileCreateList />
        <ProfileUserLists />
        <div className="profile-main__column">
            <ProfileSelect visibility>Who can see your lists?</ProfileSelect>
            <ProfileSelect lists={userLists}>Would you like to remove a list?</ProfileSelect>
        </div>
    </section>
  )
}

export default ProfilePage