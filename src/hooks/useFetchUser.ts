import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { IUser } from '@/types/user';
import { useAppSelector } from './useRedux';
import { scrollToUpPage } from '@/utils/scrollToUpPage';

const useFetchUser = (id: string) => {
    const currentUser = useAppSelector(state => state.user)
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>(currentUser.id === id ? true : false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        scrollToUpPage();
        
        if (isCurrentUser) return;
        setIsCurrentUser(currentUser.id === id ? true : false)
        fetchUser();
    }, [id])
    

    async function fetchUser() {
        try {
            if (isCurrentUser) return;
            setLoading(true);

            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const user = docSnap.data() as IUser;  
                setUser(user); 
            }
    
        } catch (err: unknown) {
            console.error("Error fetching user data:", err);
        } 
        finally {
            setLoading(false);
        }
    }

    return {
        loading, 
        isCurrentUser,
        user: isCurrentUser ? currentUser : user, 
    }
}

export default useFetchUser