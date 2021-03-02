import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {verifyAdmin} from "../../features/admin";

export const adminVerify = createAsyncThunk('admin', verifyAdmin)

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        auth: false,
        name: ''
    },
    reducers: {
        fulfilled: (state, action) => {
            let {error, data} = action.payload
            if(!error){
                state.auth = true
                state.name = data.user_name
            }
        },
        logout: (state, action) => {
            state.auth = false
            state.name = ''
        }
    }
})

const adminReducer = adminSlice.reducer
export default adminReducer