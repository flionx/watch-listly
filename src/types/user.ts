import { IMovie } from "./movies";

export interface IUser {
    id: number | null,
    username: string,
    avatar: string | null,
    listsVisibility: TListsVisibility,
    lists: IUserList[],
    friends: IUserFriend[],
}

export interface IUserList {
    id: number,
    name: string,
    movies: IUserListMovie[],
    poster: string,
    color: string,
}

export interface IUserListMovie {
    movie: IMovie,
    rate: number | null,
}
export interface IUserFriend {
    id: number,
    name: string,
    avatar: string | null,
}

export type TListsVisibility = 'everybody' | 'nobody' | 'friends'; 