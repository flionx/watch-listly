import { FC } from 'react';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileCover from '../ProfileCover/ProfileCover';
import { IUser } from '@/types/user';
import './ProfileHeader.css'
interface Props {
    isCurrentUser: boolean,
    id: IUser['id'],
    cover: IUser['cover'],
    username: IUser['username'],
    avatar: IUser['avatar'],
}

const ProfileHeader:FC<Props> = ({isCurrentUser, id, cover, username, avatar}) => {

  return (
    <header className="profile-main__header header-profile">
        <ProfileCover id={id} cover={cover} isCurrentUser={isCurrentUser}/>
        <ProfileAvatar avatar={avatar} isCurrentUser={isCurrentUser}/>
        <div className="header-profile__bottom">
            <div className="header-profile__user-info">
                <div className="header-profile__username profile-main-title2">{username}</div>
                <p className="header-profile__userdesc">Description</p>
            </div>
        </div>
    </header>
  )
}

export default ProfileHeader