import { FC } from 'react';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import ProfileCover from '../ProfileCover/ProfileCover';
import { IUser } from '@/types/user';
import './ProfileHeader.css'
import { TitleSmall } from '@/ui/Text/Text';
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
                <h3><TitleSmall>{username}</TitleSmall></h3>
                <p className="header-profile__userdesc">Description</p>
            </div>
        </div>
    </header>
  )
}

export default ProfileHeader