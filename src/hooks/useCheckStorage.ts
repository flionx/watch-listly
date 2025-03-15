import useFetchTMDB from './useFetchTMDB';

const useCheckStorage = (path: string, key: 'movies-hero',) => {
    
    const storage = localStorage.getItem(key); 
    if (!storage) {
        useFetchTMDB(path, key);
    }

}

export default useCheckStorage