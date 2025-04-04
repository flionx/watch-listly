import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import './ProfileCreateList.css'

const ProfileCreateList = () => {
  return (
    <section className='profile-main__create-list'>
        <div className="create-list__title profile-main-title2">Create new list</div>
        <div className="create-list__row">
            <input className='create-list__input' 
                type="text" 
                placeholder='Enter list name'
            />
            <ButtonHero onClick={() => {}}>Create</ButtonHero>
        </div>
    </section>
  )
}

export default ProfileCreateList