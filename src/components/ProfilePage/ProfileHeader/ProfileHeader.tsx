import { useState } from 'react';
import testAvatar from '/profilePage/testavatar.png'
import testCover from '/profilePage/testcover.png'
import './ProfileHeader.css'

const ProfileHeader = () => {
    const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="profile-main__header header-profile">
        <div className="header-profile__cover" 
        style={{backgroundImage: `url(${testCover})`}
        }>
            <div className="header-profile__more-info">
                <button className="header-profile__dots btn-header-profile"
                    onClick={() => setShowSettings(curr => !curr)}>
                </button>
                {showSettings && 
                <div className="header-profile__dots-info">
                    <button>Copy your ID</button>
                    <button>Change Cover</button>
                    <button>Change Username</button>
                    <button>Change Password</button>
                    <button>Sign out</button>
                </div>}
            </div>
        </div>
        <div className="header-profile__avatar">
            <img src={testAvatar} alt="user avatar" />
            <button className="header-profile__btn-edit btn-header-profile"></button>
        </div>
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