import React, { useState, useContext } from 'react'
import { Box, Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MainLayout from '../layouts/main'

import { doPost } from '../lib/fetch'
import { inputChangeHandler } from '../lib/eventHandlers'
import FormAlert from '../components/FormAlert'
import { AuthContext } from '../providers/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    marginBottom: 40
  }
}))

const Login = ({ location, history }) => {
  const classes = useStyles()
  const { login } = useContext(AuthContext)

  const defaultState = {
    username: '',
    password: ''
  }
  const [loginState, setLoginState] = useState(defaultState)
  const [formResponse, setFormResponse] = useState({
    title: '',
    message: '',
    type: 'success'
  })
  const [showAlert, setShowAlert] = useState(false)

  const handleInput = (event) => {
    inputChangeHandler(event, [loginState, setLoginState])
  }

  const submitForm = async (event) => {
    // await api call for login
    const resp = await doPost('/api/user/login', JSON.stringify(loginState), false)
    // handle errors

    const result = await resp.json()
    if (!resp.ok) {
      await setFormResponse({
        type: 'error',
        title: 'Error',
        message: `${result.message}`
      })
    } else {
      login(await result)
      if (location.state && location.state.referrer) {
        history.push(location.state.referrer)
      } else {
        history.push('/dashboard')
      }
    }
    setShowAlert(true)
  }

  return (
    <MainLayout>
      <Container maxWidth="xs">
        <Box>
          <h1>Login Page</h1>
          <div>
            <FormAlert
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              alertTitle={formResponse.title}
              alertMessage={formResponse.message}
              alertType={formResponse.type}
            />
          </div>
          <div>
            <form name="login-form" className={classes.root}>
              {/* {username input} */}
              <TextField
                label="Username"
                name="username"
                fullWidth
                variant="outlined"
                onChange={handleInput}
                value={loginState.username}
              />

              {/* {password input} */}
              <TextField
                label="Password"
                type="password"
                name="password"
                fullWidth
                variant="outlined"
                onChange={handleInput}
                value={loginState.password}
              />

              <Button
                onClick={submitForm}
                variant="contained"
                color="primary"
                name="login"
              >
                Login
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    </MainLayout>
  )
}

export default Login
