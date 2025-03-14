import { Link } from 'react-router-dom'
import logo from '../../../public/header/logo.svg'
import './Header.css'
import { useState } from 'react'

const Header = () => {
    const [search, setSearch] = useState<string>('')
    const [isActive, setIsActive] = useState(false);

  return (
    <header className="header">
        <Link className="header__logo logo" to='/'>
            <img src={logo} alt="logo" />
        </Link>
        <div className="header__right">
            <nav className="header__nav">
                <ul className="header__list">
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/categories'><li>Categories</li></Link>
                    <Link to='/genres'><li>Genres</li></Link>
                </ul>
            </nav>
            <span className='header__line-vertical'>|</span>
            <form 
                onClick={() => !isActive && setIsActive(true)}
                className={`header__search ${isActive && 'header__search-active'}`}>
                <input type="text" 
                    onBlur={() => !search && setIsActive(false)}
                    onFocus={() => setIsActive(true)}
                    onChange={(e) => setSearch(e.target.value)} 
                    value={search}/>
            </form>
        </div>
    </header>
  )
}

export default Header