import { FC, useRef} from "react"
import { Link, NavLink } from "react-router-dom"
import { mainSidebarLinks } from "./links"
import { useAppSelector } from "@/hooks/useRedux"
import { TSetState } from "@/types/global"
import test1 from '/sidebar/test1.png?url'
import test2 from '/sidebar/test2.png?url'
import test3 from '/sidebar/test3.png?url'
import logo from '/sidebar/logo.svg?url'
import './Sidebar.css'
interface Props {
    open: {
        isOpen: boolean,
        setIsOpen: TSetState<boolean>,
    }
}

const SideBar:FC<Props> = ({open}) => {
    const {isOpen, setIsOpen} = open;
    const defineClass = !isOpen ? 'anim-close' : 'anim-show';
    const searchRef = useRef<HTMLInputElement>(null);
    const searchHandle = () => {
        if (!searchRef.current) return;
        searchRef.current.focus()
    }
    const {username, userid, userIcon} = useAppSelector(state => state.user)

  return (
    <aside className={`sidebar ${!isOpen ? 'sidebar-close' : ''}`} 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}>
        <NavLink to='/'>
            <img src={logo} alt="logo" className={`sidebar__logo ${defineClass}`} />
        </NavLink>

        <button className={`sidebar__search`} onClick={searchHandle}>
            <input ref={searchRef} type="text" className={`sidebar__search-input ${!isOpen ? 'less' : ''}`} placeholder="search" />
        </button>
        <nav className="sidebar__top-nav">
            <ul className="sidebar__links">
                {mainSidebarLinks.map(link => (
                    <NavLink key={link.path} to={link.path} className={!isOpen ? 'less' : ''}>
                        <li className={defineClass}>{link.text}</li>
                    </NavLink>
                ))}
            </ul>
        </nav>
        <div className="sidebar__bottom">
            <nav className={`sidebar__middle-nav ${defineClass}`}>
                <p className="sidebar__middle-text">My lists</p>
                <ul className="sidebar__lists">
                    <Link to=''><img src={test1} alt="icon" /><li>My favorite</li></Link>
                    <Link to=''><img src={test2} alt="icon" /><li>Want</li></Link>
                </ul>
                <button className='sidebar__button'><span></span>Create list</button>
            </nav>
            <div className='sidebar__profile profile-sidebar'>
                {username ? 
                    <>
                    <div className="profile-sidebar__main">
                        <div className="profile-sidebar__icon">
                            <img src={userIcon || test3} alt="icon" />
                        </div>
                        <div className={`profile-sidebar__info ${defineClass}`}>
                            <p className="profile-sidebar__name">{username}</p>
                            <p className="profile-sidebar__id">@{userid}</p>
                        </div>
                    </div>
                    <button className={`profile-sidebar__dots ${defineClass}`}></button>
                </> : 
                <div className={`profile-sidebar__auth ${defineClass}`}>
                    <Link to='/auth/signin'>Log in</Link>
                    or
                    <Link to='/auth/signup' className="auth-btn-main">Sign up</Link>
                </div>
                }
            </div>
        </div>
    </aside>
  )
}

export default SideBar