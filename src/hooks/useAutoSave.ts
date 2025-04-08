import { useEffect, useRef } from "react";
import { useAppSelector } from "./useRedux";
import { auth, db } from "@/app/firebase";
import { doc, setDoc } from "firebase/firestore";
import { IUser } from "@/types/user";

const useAutoSave = () => {
    const userState = useAppSelector(state => state.user);
    const prevStateRef = useRef<IUser | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const saveData = async () => {
        const user = auth.currentUser;
        if (!user) return;

        if (!prevStateRef.current || JSON.stringify(prevStateRef.current) !== JSON.stringify(userState)) {
            prevStateRef.current = userState;

            try {
                const dataRef = doc(db, "users", userState.id);
                await setDoc(dataRef, userState);                
            } catch (error) {
                console.error("Error saving data:", error);
            }
        }
    };

    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(saveData, 4000);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [userState]);
};

export default useAutoSave;
