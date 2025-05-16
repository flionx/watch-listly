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

    useEffect(() => {
        if (!loading && user) {
            if (listType === 'basic') {
                setList(user[key as TBasicListsKey])
            } else {
                const userList = user.lists.find(list => list.id === Number(key));
                setList(userList?.movies ?? [])
            }
        }
    }, [loading, user])

    return {
        loading, 
        isCurrentUser,
        list, 
    }
}

export default useFetchList
