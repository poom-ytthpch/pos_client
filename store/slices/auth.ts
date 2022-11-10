import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import initialState from '../types/user';

interface payload {
    user: object,
    role: string
}

export const authenticationSlice = createSlice({
    name: 'signInSlice',
    initialState,
    reducers: {
        signIn: (state, actions: PayloadAction<payload>) => {

            state.userInfo = actions.payload.user
            state.userRole = actions.payload.role

        },

        signOut: (state) => {
            state.userInfo = { token: "" }
            state.userRole = ""
        }

    },
})

// Action creators are generated for each case reducer function
export const { signIn, signOut } = authenticationSlice.actions

export default authenticationSlice.reducer