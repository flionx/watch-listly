import { NavLink } from 'react-router-dom'
import './MobileNavbar.css'

const MobileNavbar = () => {
  return (
    <nav className='mobile-nav'>
        <NavLink to='/' className="mobile-nav__link mobile-nav__link-home">Home</NavLink>
        <button className='mobile-nav__link mobile-nav__link-search'>Search</button>
        <NavLink to='/library' className="mobile-nav__link mobile-nav__link-library">Library</NavLink>
        <NavLink to='/friends' className="mobile-nav__link mobile-nav__link-friends">Friends</NavLink>
        <button className='mobile-nav__profile'>
            <div className="profile__img"></div>
            Profile</button>
    </nav>
  )
}

export default MobileNavbar