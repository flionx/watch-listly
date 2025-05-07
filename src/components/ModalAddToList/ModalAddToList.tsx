import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import styles from './index.module.css'
import { FC, memo, ReactNode, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { IUserList, TBasicListsKey } from '@/types/user'
import { IMovie } from '@/types/movies'
import { addToBasicList, addToUserList } from '@/app/store/slices/userSlice'
import { TSetState } from '@/types/global'
interface Props {
    closeModal: VoidFunction,
    movie: IMovie,
}
type TTrackedArr = (string | number)[]

const ModalAddToList:FC<Props> = ({closeModal, movie}) => {
    const dispatch = useAppDispatch();
    const userLists = useAppSelector(state => state.user.lists);
    const [tracked, setTracked] = useState<TTrackedArr>([]);
    const callSetTracked = useCallback<TSetState<TTrackedArr>>((value) => setTracked(value), []);

    function addToList() {
        if (tracked.length === 0) return;
        tracked.forEach(value => {
            if (typeof value === 'number') {
                dispatch(addToUserList({movie, id: value}))
            } 
            if (typeof value === 'string') {
                dispatch(addToBasicList({movie, key: value as TBasicListsKey}))
            }
        })
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
                <ButtonHero onClick={addToList}>Add to list</ButtonHero>
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
    setTracked: TSetState<TTrackedArr>
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

    function addToTracked() {
        setTracked(arr => [...arr,
            ...(typeof listId === 'number' ? [listId] : []),
            ...(typeof listName === 'string' ? [listName] : [])
        ]);
        setIsAdded(c => !c)
    }

    return (
        <li className={styles.item}>{name}
            <button className={isAdded ? styles.added : styles.add}
                onClick={addToTracked}>
            </button>
        </li>
    )
})
const LineCenterText = ({children} : {children: ReactNode}) => {
    return (
        <div className={styles.line}>
        <hr />
        <span>{children}</span>
    </div>
    )
}