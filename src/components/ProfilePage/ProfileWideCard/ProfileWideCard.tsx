import testImg from '/profilePage/testavatar.png'
import './ProfileWIdeCard.css'
import { FC } from 'react'
interface Props {
    title: string,
}

const ProfileWideCard:FC<Props> = ({title}) => {
  return (
    <button className='profile-main__card-wide list-wide-card'>
        <div className="list-wide-card__title">{title}</div>
        <img src={testImg} alt="movie poster" className='list-card__img'/>
    </button>
  )
}

export default ProfileWideCard