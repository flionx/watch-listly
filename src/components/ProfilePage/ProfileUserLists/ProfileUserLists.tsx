import { useAppSelector } from '@/hooks/useRedux'
import './ProfileUserLists.css'

const ProfileUserLists = () => {
    const lists = useAppSelector(state => state.user.lists);
  return (
    <section className='profile-main__lists user-lists'>
        <div className="user-lists__title">My lists</div>
        <div className="profile-main__row">
            {lists.length > 0 ? 
                lists.map(list => (
                    <button key={list.id} className='user-lists__card'
                        style={{background: `${list.color}`}}>
                        <div className="user-lists-card__title profile-main-title2">{list.name}</div>
                        {list.poster && 
                            <img src={list.poster} alt="movie poster" className='list-card__img'/>
                        }
                    </button>

                ))
            :
                <p>You dont have lists</p>
            }
        </div>
    </section>
  )
}

export default ProfileUserLists;