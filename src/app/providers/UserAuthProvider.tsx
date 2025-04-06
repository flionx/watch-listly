import { createContext, useState, FC, ReactNode } from 'react'
import useCheckAuth from '@/hooks/useCheckAuth';

interface Props {
    children: ReactNode,
}

export const UserAuth = createContext<boolean>(false);

export const UserAuthProvider: FC<Props> = ({children}) => {
    const [user, setUser] = useState<boolean>(false);
    useCheckAuth(setUser);
    
    return (
        <UserAuth.Provider value={user}>
            {children}
        </UserAuth.Provider>
    )
}
