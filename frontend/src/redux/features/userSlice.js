import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    user:null,
    isAuthenticated:false,
    loading:false,
    error:null
}

const storedAuthStatus = localStorage.getItem("isAuthenticated")
const storedUser = localStorage.getItem("user")

if(storedAuthStatus) {
    initialState.isAuthenticated = JSON.parse(storedAuthStatus)
}

if(storedUser) {
    initialState.user = JSON.parse(storedUser)
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setIsAuthenticated(state, action) {
            state.isAuthenticated = action.payload
        },
        logout(state) {
            state.user = null
            state.isAuthenticated = false
            state.loading = false
            state.error = null
            localStorage.removeItem("isAuthenticated")
            localStorage.removeItem("user")
        }
    }
})

export default userSlice.reducer
export const {setUser, setIsAuthenticated, logout} = userSlice.actions