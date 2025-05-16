import { FC } from 'react'
import './ProfileWIdeCard.css'
interface Props {
    title: string,
}

const ProfileWideCard:FC<Props> = ({title}) => {
  return (
    <button className='profile-main__card-wide list-wide-card'>
        <h3>{title}</h3>
        {/* <img src={''} alt="movie poster" className='list-card__img'/> */}
    </button>
  )
}

export default ProfileWideCard