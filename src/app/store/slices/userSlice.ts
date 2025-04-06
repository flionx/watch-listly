import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserFriend, IUserList, TListsVisibility } from "@/types/user";
import { getUserData } from "../thunks/user/getUserInfo";

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
        }
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
    setUserFriends, setListsVisibility
} = userSlice.actions; 
export default userSlice.reducer;