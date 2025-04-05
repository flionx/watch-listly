import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserFriend, IUserList, TListsVisibility } from "@/types/user";

const initialState: IUser = {
    id: null,
    username: '',
    avatar: '',
    listsVisibility: 'everybody',
    lists: [],
    friends: [],
}

function getInitialState(): IUser {
    const storage = localStorage.getItem('user');
    return storage ? JSON.parse(storage) : initialState;
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setUser: (state, action: PayloadAction<Pick<IUser, 'id' | 'username'>>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
        },
        setUserAvatar: (state, action:PayloadAction<IUser['avatar']>) => {
            state.avatar = action.payload;
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
    }
})

export const {
    setUser, setUserAvatar, addNewUserList, 
    deleteUserList, 
    setUserFriends, setListsVisibility
} = userSlice.actions; 
export default userSlice.reducer;
