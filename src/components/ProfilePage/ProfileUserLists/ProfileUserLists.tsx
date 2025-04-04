import testImg from '/profilePage/testavatar.png'
import './ProfileUserLists.css'
const cardColors = {
    pink: '#af2896',
    blue: '#1d3164',
    lightBlue: '#477d95',
    green: '#27856a',
    lightGray: '#b2b2b2',
    orange: '#e13300',
}

const ProfileUserLists = () => {
  return (
    <section className='profile-main__lists user-lists'>
        <div className="user-lists__title">My lists</div>
        <div className="profile-main__row">
            <button className='user-lists__card'
                style={{background: `${randomColor()}`}}>
                <div className="user-lists-card__title profile-main-title2">Popular</div>
                <img src={testImg} alt="movie poster" className='list-card__img'/>
            </button>
            <button className='user-lists__card'
                style={{background: `${randomColor()}`}}>
                <div className="user-lists-card__title profile-main-title2">Popular</div>
                <img src={testImg} alt="movie poster" className='list-card__img'/>
            </button>
            <button className='user-lists__card'
                style={{background: `${randomColor()}`}}>
                <div className="user-lists-card__title profile-main-title2">Popular</div>
                <img src={testImg} alt="movie poster" className='list-card__img'/>
            </button>
            <button className='user-lists__card'
                style={{background: `${randomColor()}`}}>
                <div className="user-lists-card__title profile-main-title2">Popular</div>
                <img src={testImg} alt="movie poster" className='list-card__img'/>
            </button>
        </div>
    </section>
  )
}

export default ProfileUserLists;

function randomColor(): string {
    const random = Math.random() * 10;
    if (random <= 1.6) {
        return cardColors.blue;
    } else if (random <= 3.2) {
        return cardColors.green;
    } else if (random <= 4.8) {
        return cardColors.lightBlue;
    } else if (random <= 6.4) {
        return cardColors.lightGray;
    } else if (random <= 8.0) {
        return cardColors.orange;
    } else {
        return cardColors.pink
    }
}