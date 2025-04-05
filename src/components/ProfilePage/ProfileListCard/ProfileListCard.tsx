import { FC } from 'react'
import { IUserList } from '@/types/user'
interface Props {
    list: IUserList
}

const ProfileListCard:FC<Props> = ({list}) => {
  return (
    <button className='user-lists__card'
        style={{background: `${list.color}`}}>
        <div className="user-lists-card__title profile-main-title2">{list.name}</div>
        {list.poster && 
            <img src={list.poster} alt="movie poster" className='list-card__img'/>
        }
    </button>
  )
}

export default ProfileListCard