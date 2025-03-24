import { useCallback, useEffect, useRef, useState } from 'react';
import { TSetState } from '@/types/global';
import { IMovie } from '@/types/movies';

const useSpinStep = (
    movies: IMovie[] | Array<{}>,
    countScroll: number, // count cards scroll 
    cardWidth: number // card with(+gap) px
) => {
    const [countSpin, setCountSpin] = useState(0);
    const [maxSteps, setMaxSteps] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    const calcMaxScroll = useCallback(() => {
        if (!listRef.current || !movies.length) return;
        
        const containerWidth = listRef.current.clientWidth;
        const visibleCards = Math.floor(containerWidth / cardWidth);        
        const maxCountCardsToScroll = movies.length - visibleCards;
        const maxCountScroll = Math.max(0, Math.ceil(maxCountCardsToScroll / countScroll));
        
        setMaxSteps(maxCountScroll);
        setCountSpin(prev => Math.min(prev, maxCountScroll));
    }, [movies, cardWidth, countScroll]);

    useEffect(() => {
        if (!listRef.current) return;
        const observer = new ResizeObserver(calcMaxScroll); 
        observer.observe(listRef.current); //watch on resize

        return () => observer.disconnect();
    }, [calcMaxScroll]);

    useEffect(() => {
        calcMaxScroll();
    }, [calcMaxScroll]);

    return {countSpin, maxSteps, listRef,
        setCountSpin: useCallback<TSetState<number>>((value) => {
            setCountSpin(prev => {
                const newValue = typeof value === 'function' ? value(prev) : value;
                return Math.max(0, Math.min(newValue, maxSteps));
            });
        }, [maxSteps]),
    };
};

export default useSpinStep;