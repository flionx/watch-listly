import { db } from '@/app/firebase';
import { TSetState } from '@/types/global';
import { IUser } from '@/types/user';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useAppSelector } from './useRedux';

const useFetchUser = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser>();
    const currentUserId = useAppSelector(state => state.user.id) 

    async function fetchUser(id: string, setIsCurrentUser: TSetState<boolean>) {
        try {
            setLoading(true);
    
            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const user = docSnap.data() as IUser;  
                setUser(user); 
                setIsCurrentUser(curr => 
                    curr = (currentUserId === id) ? true : false
                )
            }
    
        } catch (err: unknown) {
            console.error("Error fetching user data:", err);
        } 
        finally {
            setLoading(false);
        }
    }

    return {loading, user, fetchUser}
}

export default useFetchUser