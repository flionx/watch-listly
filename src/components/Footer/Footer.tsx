import { Link } from 'react-router-dom'
import ExternalLink from '@/ui/ExternalLink/ExternalLink'
import { followLinks } from './followLinks'
import mylogo from '/sidebar/logo.svg?url'
import tmdblogo from '/footer/tmdb.svg?url'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__column">
        <Link to='/'className="footer__logo">
          <img src={mylogo} alt="watchlistly logo" />
        </Link>
        <nav className='footer__links'>
          <Link to='/'>Home</Link>
          <Link to='/library'>Library</Link>
          <Link to='/friends'>Friends</Link>
          <Link to='/profile'>Profile</Link>
        </nav>
      </div>
      <div className="footer__column">
        <ExternalLink className="footer__logo"
          href='https://www.themoviedb.org/'>
            <img src={tmdblogo} alt="tmdb logo" />
        </ExternalLink>
        <p className='footer__text'>This app uses TMDB and the TMDB APIs but is not 
          endorsed, certified, or otherwise approved by TMDB.</p>
      </div>
      <div className="footer__column">
        <nav className='footer__links'>
          {followLinks.map((link) => (
            <ExternalLink key={link.text} href={link.href}>{link.text}</ExternalLink>
          ))}
        </nav>
        <div className="footer__copy">
          &copy; 2025 Watch Listly
        </div>
      </div>
    </footer>
  )
}

export default Footer