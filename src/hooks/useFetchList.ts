import { useEffect, useState } from 'react';
import useFetchUser from './useFetchUser';
import { IUserListMovie, TBasicListsKey } from '@/types/user';
export interface IUseFetchListProps {
    id: string,
    listType: 'user' | 'basic',
    key: string
}

const useFetchList = ({id, listType, key}: IUseFetchListProps) => {
    const {isCurrentUser, loading, user} = useFetchUser(id);
    const [list, setList] = useState<IUserListMovie[]>([]);
    const [listName, setListName] = useState('');

    useEffect(() => {
        if (!loading && user) {
            if (listType === 'basic') {
                setList(user[key as TBasicListsKey]);
                setListName(key === 'seenList' ? 'Seen it' : 'Want to see it')
            } else {
                const userList = user.lists.find(list => list.id === Number(key));
                setList(userList?.movies ?? []);
                setListName(userList?.name!)
            }
        }
    }, [loading, user])

    return {
        loading, 
        isCurrentUser,
        list, 
        listName
    }
}

export default useFetchList
