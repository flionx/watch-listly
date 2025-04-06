import { useRef, FC } from "react"
import testAvatar from '/profilePage/testavatar.png'
import useChangeImage from "@/hooks/useChangeImage";
import { useAppSelector } from "@/hooks/useRedux";

const ProfileAvatar:FC = () => {
    const avatarRef = useRef<HTMLInputElement>(null);
    const avatar = useAppSelector(state => state.user.avatar)
    const {changeImage, uploading} = useChangeImage();

  return (
    <div className="header-profile__avatar">
        <img src={avatar || testAvatar} alt="user avatar" />
        <input className='header__input-file'
            ref={avatarRef} 
            onChange={(e) => changeImage(e, 'avatars', 'flionx')}
            type="file" 
            name="avatar" 
            id="avatar" 
            accept="image/*"
        />
        <button className="header-profile__btn-edit btn-header-profile"
            onClick={() => avatarRef.current?.click()}
        ></button>
    </div>
  )
}

export default ProfileAvatar