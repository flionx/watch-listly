import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserFriend, IUserList, TBasicListsKey, TListsVisibility } from "@/types/user";
import { getUserData } from "../thunks/user/getUserInfo";
import { IMovie } from "@/types/movies";
interface IAddToListParams extends IActionListParams {
    movie: IMovie
}
interface IRemoveFromListParams extends IActionListParams {
    movieId: IMovie['id']
}
interface IActionListParams {
    listId?: IUserList['id'], 
    key?: TBasicListsKey,
    type: 'user' | 'basic'
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
        addNewUserList: (state, action: PayloadAction<Pick<IUserList, 'name' | 'color'>>) => {
            const newList = {
                id: state.lists.length + 1,
                name: action.payload.name,
                movies: [],
                color: action.payload.color,
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
        addMovieToList: (state, action: PayloadAction<IAddToListParams>) => {
            const newMovie = {
                movie: action.payload.movie,
                watched: false,
                rate: null
            }
            if (action.payload.type === 'user') {
                const list = state.lists.find(list => list.id === action.payload.listId);
                list?.movies.push(newMovie);
            } else {
                state[action.payload.key!].push(newMovie)
            }
        },
        removeMovieFromList: (state, action: PayloadAction<IRemoveFromListParams>) => {
            const movieId = action.payload.movieId;
            if (action.payload.type === 'user') {
                const list = state.lists.find(list => list.id === action.payload.listId);
                if (list) {
                    list.movies = list.movies.filter(movie => movie.movie.id !== movieId);                    
                }
            } else {
                const key = action.payload.key!;
                state[key] = state[key].filter(movie => movie.movie.id !== movieId)
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
    addMovieToList, removeMovieFromList
} = userSlice.actions; 
export default userSlice.reducer;