import ButtonHero from '@/ui/ButtonHero/ButtonHero'
import styles from './index.module.css'
import { FC, ReactNode, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { IUserList } from '@/types/user'
import { IMovie } from '@/types/movies'
interface Props {
    closeModal: VoidFunction,
    idMovie: IMovie['id'],
}

const ModalAddToList:FC<Props> = ({closeModal, idMovie}) => {
    const userLists = useAppSelector(state => state.user.lists);

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
                    <RowList key={list.id} listId={list.id} name={list.name} />
                ))}
            </ul>
            <LineCenterText>Basic lists</LineCenterText>
            <ul className={styles.list}>
                <RowList name='Seen it' listName='seenList'/>
                <RowList name='Want to see it' listName='wantList'/>
            </ul>
            <div className={styles.btns}>
                <ButtonHero noBg onClick={closeModal}>Cancel</ButtonHero>
                <ButtonHero onClick={()=>{}}>Add to list</ButtonHero>
            </div>
        </div>
    </div>
  )
}

export default ModalAddToList

interface PropsRow {
    name: IUserList['name'],
    listId?: IUserList['id'],
    listName?: string
}

const RowList: FC<PropsRow> = ({name, listId, listName}) => {
    const [isAdded, setIsAdded] = useState(false);

    return (
        <li className={styles.item}>{name}
            <button className={isAdded ? styles.added : styles.add}
                onClick={() => setIsAdded(c => !c)}>
            </button>
        </li>
    )
}
const LineCenterText = ({children} : {children: ReactNode}) => {
    return (
        <div className={styles.line}>
        <hr />
        <span>{children}</span>
    </div>
    )
}