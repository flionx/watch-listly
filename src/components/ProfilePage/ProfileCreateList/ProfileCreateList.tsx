import { useRef, useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux'
import { addNewUserList } from '@/app/store/slices/userSlice';
import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import './ProfileCreateList.css'
import { TitleSmall } from '@/ui/Text/Text';

const ProfileCreateList = () => {
  const [newListName, setNewListName] = useState('');
  const dispatch = useAppDispatch();

  function createNewList() {
    if (!newListName.trim()) return;
    dispatch(addNewUserList(newListName))
    setNewListName('');
    inputRef.current?.focus();
  } 
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <section className='profile-main__create-list'>
        <h2><TitleSmall>Create new list</TitleSmall></h2>
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