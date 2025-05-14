import { useAppSelector } from "@/hooks/useRedux";
import { FC, memo, useEffect, useState } from "react";
import { IUserList, TBasicListsKey } from "@/types/user";
import { IMovie } from "@/types/movies";
import { TSetState } from "@/types/global";
import { ITracked } from "./ModalAddToList";
import styles from './index.module.css'

interface Props {
    name: IUserList['name'],
    movie: IMovie,
    listId?: IUserList['id'],
    listName?: TBasicListsKey,
    setTracked: TSetState<ITracked[]>
}

const RowList: FC<Props> = memo(({name, movie, listId, listName, setTracked}) => {
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
        const value = listId ?? listName;
        if (value === undefined) return;
        setTracked(arr => [...arr,
            { value, action: isAdded ? 'remove' : 'add' }
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

export default RowList;