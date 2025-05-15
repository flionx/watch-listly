import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { IUserListMovie } from '@/types/user';
// import useFetchList from '@/hooks/useFetchList';
import useFetchUser from '@/hooks/useFetchUser';

const ListPage = () => {
    const {userId, listType, key} = useParams();
    const {isCurrentUser, loading, user} = useFetchUser(userId as string);
    const [list, setList] = useState<IUserListMovie[]>([])

    useEffect(() => {
        if (!user) return;
        const list = user?.lists.find(list => list.id === Number(key));        
        setList(list?.movies!)
    }, [user])

  return (
    <ul className="">
        {!loading && list.map(movie => (
            <li key={movie.movie.id}>{movie.movie.name}</li>
        ))}
    </ul>
  )
}

export default ListPage