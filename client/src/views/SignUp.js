import React, { useState } from 'react'
import { Box, Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { inputChangeHandler } from '../lib/eventHandlers'
import { doPost } from '../lib/fetch'
import FormAlert from '../components/FormAlert'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  }
}))

const SignUp = ({ location, history }) => {
  const classes = useStyles()

  const initialFormState = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: ''
  }

  const [formState, setFormState] = useState(initialFormState)
  const [formResponse, setFormResponse] = useState({
    title: '',
    message: '',
    type: 'success'
  })

  const [showAlert, setShowAlert] = useState(false)

  const handleInput = (event) => {
    inputChangeHandler(event, [formState, setFormState])
  }

  const submitForm = async (event) => {
    // await api call for login
    const resp = await doPost('/api/user/register', JSON.stringify(formState), false)

    const result = await resp.json()
    if (!resp.ok) {
      await setFormResponse({
        type: 'error',
        title: 'Error',
        message: `${result[0].message}`
      })
    } else {
      setFormResponse({
        type: 'success',
        title: 'Success!',
        message: `${await result.message}`
      })
    }
    setShowAlert(true)
  }

  return (
    <Container maxWidth="xs">
      <Box>
        <h1>Sign Up</h1>
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
            <TextField
              label="First Name"
              name="first_name"
              fullWidth
              variant="outlined"
              onChange={handleInput}
              value={formState.first_name}
            />

            {/* {password input} */}
            <TextField
              label="Last Name"
              name="last_name"
              fullWidth
              variant="outlined"
              onChange={handleInput}
              value={formState.last_name}
            />

            <TextField
              label="Email"
              name="email"
              fullWidth
              variant="outlined"
              onChange={handleInput}
              value={formState.email}
            />

            {/* {password input} */}
            <TextField
              label="Password"
              type="password"
              name="password"
              fullWidth
              variant="outlined"
              onChange={handleInput}
              value={formState.password}
            />

            <TextField
              label="Phone Number"
              type="tel"
              name="phone"
              pattern="/^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/"
              fullWidth
              variant="outlined"
              onChange={handleInput}
              value={formState.phone}
              helperText="format: 718-555-1212"
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
  )
}

export default SignUp
