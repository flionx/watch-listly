import { useAppSelector } from '@/hooks/useRedux'
import { NavLink } from 'react-router-dom'
import defaultAvatar from '/profilePage/default-avatar.svg'
import './MobileNavbar.css'

const MobileNavbar = () => {
  const {id, avatar} = useAppSelector(state => state.user)
  return (
    <nav className='mobile-nav'>
        <NavLink to='/' className="mobile-nav__link mobile-nav__link-home">Home</NavLink>
        <button className='mobile-nav__link mobile-nav__link-search'>Search</button>
        <NavLink to='/library' className="mobile-nav__link mobile-nav__link-library">Library</NavLink>
        <NavLink to='/friends' className="mobile-nav__link mobile-nav__link-friends">Friends</NavLink>
        <NavLink to={id ? `/user/${id}` : '/auth/signup'} className='mobile-nav__profile'>
            <img src={avatar || defaultAvatar} alt='avatar' className="profile__img"></img>
            Profile</NavLink>
    </nav>
  )
}

export default MobileNavbar