import { IMovie } from '@/types/movies';
import { useState } from 'react'
interface IModalAdd {
    show: boolean,
    movie: IMovie | null,
}

const useModalAdd = (movie: IMovie) => {
    const [modalAdd, setModalAdd] = useState<IModalAdd>({
        show: false,
        movie: null,
    });
    function showModalAdd() {
        setModalAdd({movie: movie, show: true})        
    }
    function hideModalAdd() {
        setModalAdd(c => ({...c, show: false})) 
    }

    return {modalAdd, showModalAdd, hideModalAdd}
}

export default useModalAdd