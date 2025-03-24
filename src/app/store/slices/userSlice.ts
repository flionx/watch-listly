import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
    username: string,
    userid: string,
    userIcon: string,
}

const initialState: IState = {
    username: '',
    userid: '',
    userIcon: '',
}

function getInitialState(): IState {
    const storage = localStorage.getItem('user');
    return storage ? JSON.parse(storage) : initialState;
}

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        setUser: (state, action: PayloadAction<Pick<IState, 'username' | 'userid' | 'userIcon'>>) => {
            state.username = action.payload.username;
            state.userid = action.payload.userid;
            if (action.payload.userIcon) {
                state.userIcon = action.payload.userIcon;
            }
            localStorage.setItem('user', JSON.stringify(state));
        },
        removeUser: (state) => {
            state.userid = '';
            state.username = '';
            state.userIcon = '';
            localStorage.setItem('user', JSON.stringify(state));
        }
    }
})

export const {setUser, removeUser} = userSlice.actions; 
export default userSlice.reducer;
