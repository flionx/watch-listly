import { useState } from 'react'
import { useAppDispatch } from '@/hooks/useRedux';
import { addNewUserList } from '@/app/store/slices/userSlice';
import styles from './index.module.css'
import ButtonHero from '@/ui/ButtonHero/ButtonHero';

const CreateNewList = () => {
    const dispatch = useAppDispatch();
    const [hasCreateInput, setHasCreateInput] = useState(false);
    const [newListName, setNewListName] = useState('');
    
    function createNewList() {
        if (!newListName.trim()) return;
        dispatch(addNewUserList(newListName));
        setNewListName('');
        setHasCreateInput(false);
    }

  return (
    <div className={styles.newblock}>
        {!hasCreateInput ? (
            <button className={styles.createlist} 
                onClick={() => setHasCreateInput(true)}>+ Create new list
            </button>
        ) : (
        <div className={styles.newinput}>
            <input type="text" 
                placeholder='Enter list name'
                value={newListName}
                onChange={e => setNewListName(e.target.value)}
            />
            <ButtonHero onClick={createNewList}>Create</ButtonHero>
        </div>
        )}
    </div>
  )
}

export default CreateNewList