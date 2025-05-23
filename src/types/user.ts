import { TLoading } from "./global";
import { IMovie } from "./movies";

export interface IUser {
    id: string,
    uid: string,
    username: string,
    avatar: string | null,
    cover: string | null,
    listsVisibility: TListsVisibility,
    seenList: IUserListMovie[],
    wantList: IUserListMovie[],
    lists: IUserList[],
    friends: IUserFriend[],
    loading: TLoading,
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
    watched: boolean,
    rate: number | null,
}
export interface IUserFriend {
    id: number,
    name: string,
    avatar: string | null,
}

export type TListsVisibility = 'everybody' | 'nobody' | 'friends'; 

export type TBasicListsKey = 'seenList' | 'wantList'; 