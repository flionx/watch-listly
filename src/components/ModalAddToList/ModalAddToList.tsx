import { FC, useCallback, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { IUserList, TBasicListsKey } from '@/types/user'
import { IMovie } from '@/types/movies'
import { TSetState } from '@/types/global'
import { toggleMovieInList } from '@/app/store/slices/userSlice'
import RowList from './RowList'
import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import LineCenterText from './LineCenterText'
import CreateNewList from './CreateNewList'
import styles from './index.module.css'
interface Props {
    closeModal: VoidFunction,
    movie: IMovie,
}
export interface ITracked {
    value: string | number,
    action: 'add' | 'remove', 
}

const ModalAddToList:FC<Props> = ({closeModal, movie}) => {
    const dispatch = useAppDispatch();
    const userLists = useAppSelector(state => state.user.lists);
    const [filterInput, setFilterInput] = useState('');

    const [tracked, setTracked] = useState<ITracked[]>([]);
    const callSetTracked = useCallback<TSetState<ITracked[]>>((value) => setTracked(value), []);

    const filteredUserLists = useMemo<IUserList[]>(() => {     
        if (!filterInput) return userLists;
        return userLists.filter(list => list.name.toLocaleLowerCase().includes(filterInput.toLocaleLowerCase()))
    }, [filterInput, userLists])

    function saveTracked() {
        if (tracked.length === 0) return;
        tracked.forEach(list => {
            dispatch(toggleMovieInList({
                movie,
                action: list.action,
                type: typeof list.value === 'number' ? 'user' : 'basic',
                listkey: list.value as number | TBasicListsKey,
            }))
        })
        closeModal();
    }

  return (
    <div className={styles.bg} onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
            <button className={styles.input}>
                <input 
                    type="text" 
                    placeholder='Search by list name'
                    value={filterInput}
                    onChange={e => setFilterInput(e.target.value)}
                />
            </button>
            <CreateNewList />
            {filteredUserLists.length > 0 && <LineCenterText>My lists</LineCenterText>}
            <ul className={styles.list}>
                {filteredUserLists.map(list => (
                    <RowList key={list.id} 
                        listId={list.id} 
                        movie={movie}
                        name={list.name} 
                        setTracked={callSetTracked}
                    />
                ))}
            </ul>
            <LineCenterText>Basic lists</LineCenterText>
            <ul className={styles.list}>
                <RowList name='Seen it' 
                    listName='seenList' 
                    movie={movie}
                    setTracked={callSetTracked}
                />
                <RowList name='Want to see it' 
                    listName='wantList' 
                    movie={movie}
                    setTracked={callSetTracked}
                />
            </ul>
            <div className={styles.btns}>
                <ButtonHero noBg onClick={closeModal}>Cancel</ButtonHero>
                <ButtonHero onClick={saveTracked}>Save</ButtonHero>
            </div>
        </div>
    </div>
  )
}

export default ModalAddToList