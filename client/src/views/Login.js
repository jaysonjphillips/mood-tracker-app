import React, {useState} from 'react'
import {Box, Container, TextField, Button} from '@material-ui/core'

import {doPost} from '../lib/fetch'

export default props => {
    const defaultState = {
        username: "",
        password: ""
    }
    const [loginData, setLoginData] = useState(defaultState)

    const handleInput = e => {
        e.persist()
        setLoginData((loginData) => ({
            ...loginData, 
            [e.target.name]: e.target.value
        }))
    }

    const submitForm = async event => {

        // await api call for login
        const resp = await doPost('/api/user/login', JSON.stringify(loginData), false)
        // handle errors

        if(!resp.ok) return false// respond with error

        // handle success
        const result = await resp.json()
        console.log(await result)
    }

    return (
            <Container maxWidth='xs'>
                <Box>
                    <h1>Login Page</h1>
                    <div>
                        <form name="login-form">
                            {/* {username input} */}
                            <TextField 
                                label='Username'
                                name='username'
                                fullWidth
                                variant='outlined'
                                onChange={handleInput}
                                value={loginData.username}
                            />

                            {/* {password input} */}
                            <TextField 
                                label='Password'
                                type='password'
                                name='password'
                                fullWidth
                                variant='outlined'
                                onChange={handleInput}
                                value={loginData.password}
                                />

                            <Button 
                                onClick={submitForm}
                                variant='contained'
                                color='primary'
                                name='login'>
                                    Login
                            </Button>
                        </form>
                    </div>
                </Box>
            </Container>
    )
}