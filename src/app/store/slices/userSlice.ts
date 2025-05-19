import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserFriend, IUserList, TBasicListsKey, TListsVisibility } from "@/types/user";
import { getUserData } from "../thunks/user/getUserInfo";
import { IMovie } from "@/types/movies";
import randomColorList from "@/utils/randomColorList";
export interface IToggleMovieInListParams {
    movie: IMovie
    listKey: number | TBasicListsKey,
    type: 'user' | 'basic',
    action: 'add' | 'remove'
}
export interface IChangeMovieRateParams {
    movieId: number
    listKey: number | TBasicListsKey,
    type: 'user' | 'basic',
    value: number
}

export const initialUserState: IUser = {
    id: '',
    uid: '',
    username: '',
    avatar: '',
    cover: '',
    listsVisibility: 'everybody',
    seenList: [],
    wantList: [],
    lists: [],
    friends: [],
    loading: 'idle',
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUser: (_, action: PayloadAction<IUser>) => {
            return action.payload;
        },
        setUserAvatar: (state, action:PayloadAction<IUser['avatar']>) => {
            state.avatar = action.payload;
        },
        setUserCover: (state, action:PayloadAction<IUser['cover']>) => {
            state.cover = action.payload;
        },
        addNewUserList: (state, action: PayloadAction<IUserList['name']>) => {
            const newList = {
                id: state.lists.length + 1,
                name: action.payload,
                movies: [],
                color: randomColorList(),
                poster: '',
            }
            state.lists.push(newList);
        },
        deleteUserList: (state, action: PayloadAction<IUserList['id']>) => {
            state.lists = state.lists.filter(list => list.id != action.payload);
        },
        setUserFriends: (state, action: PayloadAction<IUserFriend[]>) => {
            state.friends = action.payload;
        },
        setListsVisibility: (state, action: PayloadAction<TListsVisibility>) => {
            state.listsVisibility = action.payload
        },
        toggleMovieInList: (state, action: PayloadAction<IToggleMovieInListParams>) => {            
            if (action.payload.action === 'add') {
                const newMovie = {
                    movie: action.payload.movie,
                    watched: false,
                    rate: null
                }
                if (action.payload.type === 'user') {
                    const list = state.lists.find(list => list.id === action.payload.listKey);
                    list?.movies.push(newMovie);
                } else {
                    state[action.payload.listKey as TBasicListsKey].push(newMovie)
                }
            } else {
                const movieId = action.payload.movie.id;
                if (action.payload.type === 'user') {
                    const list = state.lists.find(list => list.id === action.payload.listKey);
                    if (list) {
                        list.movies = list.movies.filter(movie => movie.movie.id !== movieId);                    
                    }
                } else {
                    const key = action.payload.listKey as TBasicListsKey;
                    state[key] = state[key].filter(movie => movie.movie.id !== movieId)
                }
            }
        },
        changeMovieRate: (state, action: PayloadAction<IChangeMovieRateParams>) => {            
            if (action.payload.type === 'user') {
                const list = state.lists.find(list => list.id === Number(action.payload.listKey));
                const movie = list?.movies.find(movie => movie.movie.id === action.payload.movieId);
                if (!movie) return;
                movie.rate = action.payload.value;
            } else {
                const movie = state[action.payload.listKey as TBasicListsKey].find(movie => movie.movie.id === action.payload.movieId);
                if (!movie) return;
                movie.rate = action.payload.value
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserData.pending, (state) => {
            state.loading = 'pending';
        })
        .addCase(getUserData.fulfilled, (state, action: PayloadAction<IUser | undefined>) => {
            if (action.payload) {
                return action.payload;
            }
            state.loading = 'succeeded';
        })
        .addCase(getUserData.rejected, (state) => {
            state.loading = 'failed';
        })
    }
})

export const {
    setUser, setUserAvatar, addNewUserList, 
    deleteUserList, setUserCover,
    setUserFriends, setListsVisibility,
    toggleMovieInList, changeMovieRate
} = userSlice.actions; 
export default userSlice.reducer;