import { FC} from "react"
import { Link, NavLink } from "react-router-dom"
import test1 from '../../../public/sidebar/test1.png'
import test2 from '../../../public/sidebar/test2.png'
import test3 from '../../../public/sidebar/test3png.png'
import './Sidebar.css'
import { TSetState } from "@/types/global"
import { mainSidebarLinks } from "./links"
interface Props {
    open: {
        isOpen: boolean,
        setIsOpen: TSetState<boolean>,
    }
}

const SideBar:FC<Props> = ({open}) => {
    const {isOpen, setIsOpen} = open;

  return (
    <aside className={`sidebar ${!isOpen ? 'sidebar-close' : ''}`} 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}>
        <nav className="sidebar__top-nav">
            <ul className="sidebar__links">
                {mainSidebarLinks.map(link => (
                    <NavLink to={link.path} className={!isOpen ? 'less' : ''}>
                        <li className={!isOpen ? 'anim-close' : ''}>{link.text}</li>
                    </NavLink>
                ))}
            </ul>
        </nav>
        <div className="sidebar__bottom">
            <nav className={`sidebar__middle-nav ${!isOpen ? 'anim-close' : ''}`}>
                <p className="sidebar__middle-text">My lists</p>
                <ul className="sidebar__lists">
                    <Link to=''><img src={test1} alt="icon" /><li>My favorite</li></Link>
                    <Link to=''><img src={test2} alt="icon" /><li>Want</li></Link>
                </ul>
                <button className="sidebar__button"><span></span>Create list</button>
            </nav>
            <div className="sidebar__profile profile-sidebar">
                <div className="profile-sidebar__main">
                    <div className="profile-sidebar__icon">
                        <img src={test3} alt="icon" />
                    </div>
                    <div className={`profile-sidebar__info ${!isOpen ? 'anim-close' : ''}`}>
                        <p className="profile-sidebar__name">Danila</p>
                        <p className="profile-sidebar__id">@flionx</p>
                    </div>
                </div>
                <button className="profile-sidebar__dots"></button>
            </div>
        </div>
    </aside>
  )
}

export default SideBar