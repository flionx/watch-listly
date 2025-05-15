import { useEffect, useState } from 'react'
import { useAppSelector } from './useRedux';
import { IUser } from '@/types/user';
import { scrollToUpPage } from '@/utils/scrollToUpPage';

const useCurrentUserId = (id: string, callback: VoidFunction) => {
    const currentUser = useAppSelector(state => state.user)
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(currentUser.id === id);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        scrollToUpPage();
        
        const newIsCurrUser = currentUser.id === id;
        console.log(newIsCurrUser);
        
        if (isCurrentUser !== newIsCurrUser ) {
            setIsCurrentUser(newIsCurrUser)
        }
        if (!newIsCurrUser) {
            callback()
        }
    }, [id, currentUser.id])

    return {currentUser, isCurrentUser, loading, setLoading, user, setUser}
}

export default useCurrentUserId