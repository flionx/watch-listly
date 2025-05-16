import { FC } from 'react'
import { IUserList } from '@/types/user'
import { TitleSmall } from '@/ui/Text/Text'
import { Link } from 'react-router-dom'
interface Props {
    list: IUserList,
    image?: boolean,
    id?: string
}

const ProfileListCard:FC<Props> = ({list, image, id}) => {
  return (
    <Link to={id ? `/list/${id}/user/${list.id}`: '/'} className='user-lists__card'
        style={{background: `${list.color}`}}>
        <h3><TitleSmall>{list.name}</TitleSmall></h3>
        {list.poster && 
            <img className={`list-card__img ${image && 'list-card__img-nolist'}`}
              src={list.poster} alt="movie poster" 
            />
        }
    </Link>
  )
}

export default ProfileListCard