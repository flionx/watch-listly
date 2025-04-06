import { FC } from 'react'
import { IUserList } from '@/types/user'
interface Props {
    list: IUserList,
    image?: boolean
}

const ProfileListCard:FC<Props> = ({list, image}) => {
  return (
    <button className='user-lists__card'
        style={{background: `${list.color}`}}>
        <div className="user-lists-card__title profile-main-title2">{list.name}</div>
        {list.poster && 
            <img className={`list-card__img ${image && 'list-card__img-nolist'}`}
              src={list.poster} alt="movie poster" 
            />
        }
    </button>
  )
}

export default ProfileListCard