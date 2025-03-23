import { TSetState } from '@/types/global';
import { IMovie } from '@/types/movies';
import { useCallback, useEffect, useRef, useState } from 'react'

const useSpinStep = (movies: IMovie[], oneScroll: number) => {
    const [countSpin, setCountSpin] = useState(0);
    const [maxSteps, setMaxSteps] = useState(0);
    const callSetCount = useCallback<TSetState<number>>((value) => setCountSpin(value), []);
    const listRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (listRef.current) {
            const containerWidth = listRef.current.getBoundingClientRect().width;
            const maxScroll = Math.max(0, Math.ceil(movies.length - containerWidth / oneScroll)); //расчет кол.ва видимых карточек
            setMaxSteps(maxScroll);
        }
    }, [movies]);

    return {countSpin, maxSteps, listRef, setCountSpin:callSetCount}
}

export default useSpinStep