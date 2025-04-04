import ProfileHeader from '@/components/ProfilePage/ProfileHeader/ProfileHeader'
import ProfileWideCard from '@/components/ProfilePage/ProfileWideCard/ProfileWideCard'
import ProfileCreateList from '@/components/ProfilePage/ProfileCreateList/ProfileCreateList'
import ProfileUserLists from '@/components/ProfilePage/ProfileUserLists/ProfileUserLists'
import '@/app/styles/css/profilePage.css'
import ProfileSelect from '@/components/ProfilePage/ProfileSelect/ProfileSelect'

const ProfilePage = () => {
    
  return (
    <section className="profile-main">
        <ProfileHeader />
        <div className="profile-main__row">
            <ProfileWideCard title='Seen it'/>
            <ProfileWideCard title='Want to see it'/>
        </div>
        <ProfileCreateList />
        <ProfileUserLists />
        <div className="profile-main__row m40">
            <ProfileSelect />
            <ProfileSelect />
        </div>
    </section>
  )
}

export default ProfilePage