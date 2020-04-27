import React from "react"

const appAuthToken = localStorage.getItem('aat')

export const initialState = {
    isLoggedIn: !!appAuthToken,
    user: null,
    token: appAuthToken || null
}

export const AuthContext = React.createContext(initialState)

export const AuthProvider = ({children}) => {
    // create user state via hooks

    // define login, registration and logout actions

    // return the AuthContext provider with data
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )

}