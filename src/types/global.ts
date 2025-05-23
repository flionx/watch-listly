import { Dispatch, SetStateAction } from "react";

export type TSetState<T> = Dispatch<SetStateAction<T>>;

export type TMovieMediaType = 'tv' | 'movie';

export type TLoading = 'idle' | 'pending' | 'succeeded' | 'failed';
