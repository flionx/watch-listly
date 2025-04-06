import { useRef, useState } from 'react';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import useChangeImage from '@/hooks/useChangeImage';
import testCover from '/profilePage/testcover.png'
import './ProfileHeader.css'

const ProfileHeader = () => {
    const [showSettings, setShowSettings] = useState(false);
    const coverRef = useRef<HTMLInputElement>(null)
    const {changeImage, imageUrl, uploading } = useChangeImage();
    
  return (
    <header className="profile-main__header header-profile">
        <div className="header-profile__cover" 
        style={{backgroundImage: `url(${imageUrl || testCover})`}
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
                <div className="header-profile__username profile-main-title2">Username</div>
                <p className="header-profile__userdesc">Description</p>
            </div>
        </div>
    </header>
  )
}

export default ProfileHeader