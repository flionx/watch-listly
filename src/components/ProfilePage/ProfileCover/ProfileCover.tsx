import { FC, useRef, useState } from 'react';
import testCover from '/profilePage/testcover.png'
import { IUser } from '@/types/user';
import useChangeImage from '@/hooks/useChangeImage';
interface Props {
    id: IUser['id'],
    cover: IUser['cover'],
    isCurrentUser: boolean,
}
const ProfileCover:FC<Props>= ({id, cover, isCurrentUser}) => {
    const coverRef = useRef<HTMLInputElement>(null)
    const {changeImage, uploading } = useChangeImage();
    const [showSettings, setShowSettings] = useState(false);
    
  return (
    <div className={`header-profile__cover ${uploading ? 'low-load-anim' : ''}`} 
    style={{backgroundImage: `${!uploading ? `url(${cover || testCover})`: ''}`}}>
        <div className="header-profile__more-info">
            <button className="header-profile__dots btn-header-profile"
                onClick={() => setShowSettings(curr => !curr)}>
            </button>
            {showSettings && 
            <div className="header-profile__dots-info">
                <button>Copy user ID</button>
                <input className='header__input-file'
                    ref={coverRef} 
                    onChange={(e) => changeImage(e, 'covers', 'flionx')}
                    type="file" 
                    name="avatar" 
                    id="avatar" 
                    accept="image/*"
                />{isCurrentUser && <>
                    <button
                        onClick={() => coverRef.current?.click()}
                    >Change Cover</button>
                    <button>Change Username</button>
                    <button>Change Password</button>
                    <button>Sign out</button>
                </>}
            </div>}
        </div>
    </div>
  )
}

export default ProfileCover