import { FC } from 'react'
import './LoadingProfilePage.css'
interface Props {
  user?: boolean,
}

const LoadingProfilePage:FC<Props> = ({user = true}) => {
  return (
    <section className="loading-profile">
        <header className="loading-profile__header header-loading-prof">
          <div className={`header-loading-prof__cover ${user ? 'low-load-anim': ''}`}>
          </div>
          <div className="header-loading-prof__bottom">
            <div className={`header-loading-prof__avatar ${user ? 'load-anim' : ''}'`}>
            </div>
            <div className="header-loading-prof__text">
                <div className={`big-text  ${user ? 'load-anim' : ''}`}></div>
                <span className={`small-text  ${user ? 'load-anim' : ''}`}></span>
            </div>
          </div>

        </header>
        <main className='loading-profile-main'>
          {user ? 
          <>
            <div className="loading-main__title load-anim"></div>
            <div className="loading-main__text load-anim"></div>
            <div className="loading-main__text load-anim"></div>
          </>
          :
            <div className='not-found-user'>User not found</div>
          }
        </main>
    </section>
  )
}

export default LoadingProfilePage