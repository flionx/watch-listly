import { FC, memo, ReactNode, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import { IUserList, TBasicListsKey } from '@/types/user'
import { IMovie } from '@/types/movies'
import { TSetState } from '@/types/global'
import { addMovieToList, removeMovieFromList } from '@/app/store/slices/userSlice'
import styles from './index.module.css'
interface Props {
    closeModal: VoidFunction,
    movie: IMovie,
}
type ITracked = {
    value: string | number,
    action: 'add' | 'remove', 
}

const ModalAddToList:FC<Props> = ({closeModal, movie}) => {
    const dispatch = useAppDispatch();
    const userLists = useAppSelector(state => state.user.lists);
    const [tracked, setTracked] = useState<ITracked[]>([]);
    const callSetTracked = useCallback<TSetState<ITracked[]>>((value) => setTracked(value), []);

    function saveTracked() {
        if (tracked.length === 0) return;
        tracked.forEach(list => {
            if (typeof list.value === 'number') {
                if (list.action === 'add') {
                    dispatch(addMovieToList({movie, type: 'user', listId: list.value}))
                } else {
                    dispatch(removeMovieFromList({movieId: movie.id, type: 'user', listId: list.value}))
                }
            } 
            if (typeof list.value === 'string') {
                if (list.action === 'add') {
                    dispatch(addMovieToList({movie, type: 'basic', key: list.value as TBasicListsKey}))
                } else {
                    dispatch(removeMovieFromList({movieId: movie.id, type: 'basic', key: list.value as TBasicListsKey}))
                }
            }
        })
        closeModal();
    }

  return (
    <div className={styles.bg} onClick={closeModal}>
        <div className={styles.modal} onClick={(e) => {e.stopPropagation()}}>
            <button className={styles.input}>
                <input type="text" placeholder='Enter list name'/>
            </button>
            <button className={styles.new}>+ Create new list</button>
            <LineCenterText>My lists</LineCenterText>
            <ul className={styles.list}>
                {userLists.map(list => (
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

interface PropsRow {
    name: IUserList['name'],
    movie: IMovie,
    listId?: IUserList['id'],
    listName?: TBasicListsKey,
    setTracked: TSetState<ITracked[]>
}

const RowList: FC<PropsRow> = memo(({name, movie, listId, listName, setTracked}) => {
    const [isAdded, setIsAdded] = useState(false);
    const currList = useAppSelector(state => {
        if (listId) return state.user.lists.find(l => l.id === listId)?.movies;
        if (listName) return state.user[listName];
    })
        
    useEffect(() => {
        if (currList?.find(m => m.movie.id === movie.id)) {
            setIsAdded(true)
        }
    }, [currList])

    function switchTracked() {
        setTracked(arr => [...arr,
            {
                value: (typeof listId === 'number' ? listId : 
                        typeof listName === 'string' ? listName : ''),
                action: isAdded ? 'remove' : 'add'
            }
        ]);
        setIsAdded(c => !c);
    }

    return (
        <li className={styles.item}>{name}
            <button className={isAdded ? styles.added : styles.add}
                onClick={switchTracked}>
            </button>
        </li>
    )
})
interface LineProps {
    children: ReactNode
}
const LineCenterText: FC<LineProps> = ({children}) => {
    return (
        <div className={styles.line}>
        <hr />
        <span>{children}</span>
    </div>
    )
}