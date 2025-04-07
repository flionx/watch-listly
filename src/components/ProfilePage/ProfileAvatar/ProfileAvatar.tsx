import { useRef, FC } from "react"
import testAvatar from '/profilePage/testavatar.png'
import useChangeImage from "@/hooks/useChangeImage";
import { IUser } from "@/types/user";
interface Props {
  avatar: IUser['avatar'],
  isCurrentUser: boolean,

}
const ProfileAvatar:FC<Props> = ({avatar, isCurrentUser}) => {
    const avatarRef = useRef<HTMLInputElement>(null);
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
        {isCurrentUser &&
          <button className="header-profile__btn-edit btn-header-profile"
              onClick={() => avatarRef.current?.click()}
          ></button>
        }
    </div>
  )
}

export default ProfileAvatar