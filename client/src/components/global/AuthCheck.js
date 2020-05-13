import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../../providers/Auth'
import {doGet} from '../../lib/fetch'


const AuthCheck = () => {
    const {checkUserSuccess, logout} = useContext(AuthContext)

    useEffect(async () => {
        const response = await doGet('/api/user')
        const result = await response.json()

        if(!response.ok) {
            return logout()
        }
        checkUserSuccess(result)
    }, [])

    return true
}

export default AuthCheck