import { db } from '@/app/firebase';
import { IUser } from '@/types/user';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';

const useFetchUser = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<IUser>()

    async function fetchUser(id: string) {
        try {
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

    return {loading, user, fetchUser}
}

export default useFetchUser