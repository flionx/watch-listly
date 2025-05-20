import { auth } from '@/app/firebase';
import { IMovie } from '@/types/movies';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
interface IModalAdd {
    show: boolean,
    movie: IMovie | null,
}

const useModalAdd = (movie: IMovie) => {
    const [modalAdd, setModalAdd] = useState<IModalAdd>({
        show: false,
        movie: null,
    });
    const navigate = useNavigate();
    function chekAuth() {
        onAuthStateChanged(auth, (user) => {        
            if (!user) {
                navigate('/auth/signin');
            }
        }); 
    }

    function showModalAdd() {
        chekAuth(); 
        setModalAdd({movie: movie, show: true});
    }
    function hideModalAdd() {
        setModalAdd(c => ({...c, show: false})) 
    }

    return {modalAdd, showModalAdd, hideModalAdd}
}

export default useModalAdd