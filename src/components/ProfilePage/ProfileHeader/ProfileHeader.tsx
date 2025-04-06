import { FC, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import useChangeImage from '@/hooks/useChangeImage';
import testCover from '/profilePage/testcover.png'
import './ProfileHeader.css'
import { IUser } from '@/types/user';
interface Props {
    id: IUser['id'],
    cover: IUser['cover'],
    username: IUser['username'],
}

const ProfileHeader:FC<Props> = ({id, cover, username}) => {
    const [showSettings, setShowSettings] = useState(false);
    const coverRef = useRef<HTMLInputElement>(null)
    const {changeImage, uploading } = useChangeImage();

  return (
    <header className="profile-main__header header-profile">
        <div className="header-profile__cover" 
        style={{backgroundImage: `url(${cover || testCover})`}
        }>
            <div className="header-profile__more-info">
                <button className="header-profile__dots btn-header-profile"
                    onClick={() => setShowSettings(curr => !curr)}>
                </button>
                {showSettings && 
                <div className="header-profile__dots-info">
                    <button>Copy your ID</button>
                    <input className='header__input-file'
                        ref={coverRef} 
                        onChange={(e) => changeImage(e, 'covers', 'flionx')}
                        type="file" 
                        name="avatar" 
                        id="avatar" 
                        accept="image/*"
                    />
                    <button
                        onClick={() => coverRef.current?.click()}
                    >Change Cover</button>
                    <button>Change Username</button>
                    <button>Change Password</button>
                    <button>Sign out</button>
                </div>}
            </div>
        </div>
        <ProfileAvatar />
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