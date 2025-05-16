import { FC } from 'react'
import './ProfileWIdeCard.css'
import { Link } from 'react-router-dom'
import { TBasicListsKey } from '@/types/user'
interface Props {
    title: string,
    pathKey: TBasicListsKey,
    id: string
}

const ProfileWideCard:FC<Props> = ({title, pathKey, id}) => {
  return (
    <Link to={`/list/${id}/basic/${pathKey}`} className='profile-main__card-wide list-wide-card'>
        <h3>{title}</h3>
        {/* <img src={''} alt="movie poster" className='list-card__img'/> */}
    </Link>
  )
}

export default ProfileWideCard