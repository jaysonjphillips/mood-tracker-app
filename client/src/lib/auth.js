import {doGet} from './fetch'

export const authCheck = async () => {
    const response = await doGet('/api/user/check')
    const checkResult = await response.json()

    if(!response.ok) {
        return false
    }

    return checkResult
}