import { useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux'
import { addNewUserList } from '@/app/store/slices/userSlice';
import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import randomColorList from '@/utils/randomColorList';
import './ProfileCreateList.css'

const ProfileCreateList = () => {
  const [newListName, setNewListName] = useState('');
  const dispatch = useAppDispatch();

  function createNewList() {
    if (!newListName.trim()) return;
    const cardColor = randomColorList();
    dispatch(addNewUserList({
      color: cardColor,
      name: newListName
    }))
    setNewListName('');
    inputRef.current?.focus();
  } 
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className='profile-main__create-list'>
        <div className="create-list__title profile-main-title2">Create new list</div>
        <form className="create-list__row" onSubmit={e => {
          e.preventDefault();
          createNewList()
        }}>
            <input className='create-list__input' 
                ref={inputRef}
                type="text" 
                placeholder='Enter list name'
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
            />
            <ButtonHero onClick={createNewList}>Create</ButtonHero>
        </form>
    </section>
  )
}

export default ProfileCreateList