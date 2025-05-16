import { FC } from 'react'
import { IUserList } from '@/types/user'
import { TitleSmall } from '@/ui/Text/Text'
interface Props {
    list: IUserList,
    image?: boolean
}

const ProfileListCard:FC<Props> = ({list, image}) => {
  return (
    <button className='user-lists__card'
        style={{background: `${list.color}`}}>
        <h3><TitleSmall>{list.name}</TitleSmall></h3>
        {list.poster && 
            <img className={`list-card__img ${image && 'list-card__img-nolist'}`}
              src={list.poster} alt="movie poster" 
            />
        }
    </button>
  )
}

export default ProfileListCard