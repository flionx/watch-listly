import { useRef, useState} from "react"
import { Link, NavLink } from "react-router-dom"
import { mainSidebarLinks } from "./links"
import { useAppSelector } from "@/hooks/useRedux"
import ButtonHero from "@/ui/ButtonHero/ButtonHero"
import defaultAvatar from '/profilePage/default-avatar.svg'
import logo from '/sidebar/logo.svg?url'
import './Sidebar.css'
import getImageUrl from "@/utils/getImageUrl"

const SideBar = () => {    
    const [isOpen, setIsOpen] = useState(false);
    // const callSetOpen = useCallback<TSetState<boolean>>((value) => setIsOpen(value), [])
    const defineClass = !isOpen ? 'anim-close' : 'anim-show';
    const searchRef = useRef<HTMLInputElement>(null);
    const searchHandle = () => {
        if (!searchRef.current) return;
        searchRef.current.focus()
    }
    const {username, id, avatar, lists} = useAppSelector(state => state.user);  

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
                {lists.length > 0 &&
                <>
                    <p className="sidebar__middle-text">My lists</p>
                    <ul className="sidebar__lists">
                        {lists.map(list => 
                            <Link to={`/list/${id}/user/${list.id}`} key={list.id}>
                                {list.movies.length > 0 && 
                                    <img src={getImageUrl(list.movies[0].movie.poster_path)} alt="icon" />
                                }
                                <li>{list.name}</li>
                            </Link>
                        )}
                    </ul>
                </>}
                <ButtonHero icon='plus sidebar__button' onClick={() => {}}>Create list</ButtonHero>
            </nav>
            <div className='sidebar__profile profile-sidebar'>
                {username ? 
                    <>
                    <div className="profile-sidebar__main">
                        <Link to={id ? `/user/${id}` : '/auth/signup'} className="profile-sidebar__icon">
                            <img src={avatar || defaultAvatar} alt="icon" />
                        </Link>
                        <div className={`profile-sidebar__info ${defineClass}`}>
                            <p className="profile-sidebar__name">{username}</p>
                            <p className="profile-sidebar__id">@{id}</p>
                        </div>
                    </div>
                    <button className={`profile-sidebar__dots ${defineClass}`}></button>
                </> : 
                <div className={`profile-sidebar__auth ${defineClass}`}>
                    <Link to='/auth/signin' className="ui__button ui__button-nobg">Log in</Link>
                    or
                    <Link to='/auth/signup' className="ui__button">Sign up</Link>
                </div>
                }
            </div>
        </div>
    </aside>
  )
}

export default SideBar