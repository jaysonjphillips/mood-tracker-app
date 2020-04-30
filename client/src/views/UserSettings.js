import React, { useState, useMemo, useContext } from 'react'
import {
  Box,
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { TimePicker } from '@material-ui/pickers'
import { Autocomplete } from '@material-ui/lab'
import moment from 'moment-timezone'
import { inputChangeHandler } from '../lib/eventHandlers'
import FormAlert from '../components/FormAlert'
import { doPost, doPut } from '../lib/fetch'
import { AuthContext } from '../providers/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700]
  },
  cardBody: {
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2)
  },
  cardButton: {
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
    marginLeft: 16
  },
  cardElement: {
    justifyContent: 'center',
    alignItems: 'baseline',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
}))

const UserSettings = () => {
  const classes = useStyles()
  const { user } = useContext(AuthContext)

  const initialFormState = {
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone: ''
  }

  const listOfTimeZones = useMemo(() => moment.tz.names(), [])

  const [formState, setFormState] = useState(initialFormState)
  const [selectedDate, setSelectedDate] = useState({
    morning: moment(Date.now()),
    afternoon: moment(Date.now()).add(6, 'hours'),
    evening: moment(Date.now()).add(12, 'hours')
  })
  const [selectedTZ, setSelectedTZ] = useState(moment.tz.guess())
  const [allTimeZones] = useState(listOfTimeZones)
  const [formResponse, setFormResponse] = useState({
    title: '',
    message: '',
    type: 'success'
  })

  const [showAlert, setShowAlert] = useState(false)

  const handleInput = (event) => {
    inputChangeHandler(event, [formState, setFormState])
  }

  const handleTimeZoneSelect = (event, newValue) => {
    event.persist()
    setSelectedTZ(newValue)
  }

  const handleSelectedDate = (name, newValue) => {
    // event.persist();
    setSelectedDate({
      ...selectedDate,
      [name]: newValue
    })
  }

  const handleMorning = (date) => {
    handleSelectedDate('morning', date)
  }

  const handleAfternoon = (date) => {
    handleSelectedDate('afternoon', date)
  }

  const handleEvening = (date) => {
    handleSelectedDate('evening', date)
  }

  const handleFormResponse = async (resp) => {
    const result = await resp.json()
    if (!resp.ok) {
      await setFormResponse({
        type: 'error',
        title: 'Error',
        message: `${result.message}`
      })
    } else {
      await setFormResponse({
        type: 'success',
        title: 'Success',
        message: `${result.message}`
      })
    }
    setShowAlert(true)
  }

  const submitProfile = async (event) => {
    event.persist()
    const resp = await doPut(
      `/api/user/${user.id}`,
      JSON.stringify({
        username: formState.username,
        first_name: formState.first_name,
        last_name: formState.last_name,
        phone: formState.phone
      }),
      false
    )
  }

  const submitPasswordChange = async (event) => {
    event.persist()
    const resp = await doPut(
      `/api/user/${user.id}`,
      JSON.stringify({
        username: formState.username,
        first_name: formState.first_name,
        last_name: formState.last_name,
        phone: formState.phone
      }),
      false
    )
  }

  const submitSettings = async (event) => {
    const resp = await doPost(
      '/api/user/settings',
      JSON.stringify({
        phone: formState.phone,
        morning: selectedDate.morning,
        afternoon: selectedDate.afternoon,
        evening: selectedDate.evening,
        time_zone: selectedTZ
      }),
      false
    )

    handleFormResponse(resp)
  }

  return (
    <Container maxWidth="xs">
      <Box>
        <h1>User Settings</h1>
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
            <Card className={classes.cardElement}>
              <CardHeader title="Profile Settings" className={classes.cardHeader} />

              <CardContent className={classes.cardBody}>
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
              </CardContent>
              <CardActions className={classes.cardButton}>
                <Button
                  name="save_profile"
                  onClick={submitProfile}
                  variant="contained"
                  color="primary"
                >
                  Save Profile
                </Button>
              </CardActions>
            </Card>

            <Card className={classes.cardElement}>
              <CardHeader title="Change Password" className={classes.cardHeader} />

              <CardContent className={classes.cardBody}>
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
                  label="Password"
                  type="password"
                  name="password"
                  fullWidth
                  variant="outlined"
                  onChange={handleInput}
                  value={formState.password}
                />
              </CardContent>
              <CardActions className={classes.cardButton}>
                <Button
                  name="change_password"
                  onClick={submitPasswordChange}
                  variant="contained"
                  color="primary"
                >
                  Change Password
                </Button>
              </CardActions>
            </Card>

            <Card className={classes.cardElement}>
              <CardHeader
                title="Set Notification Prompts"
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardBody}>
                <TimePicker
                  autoOk
                  label="Morning Reminder?"
                  value={selectedDate.morning}
                  onChange={handleMorning}
                  name="morning_prompt"
                  inputVariant="outlined"
                />

                <TimePicker
                  autoOk
                  label="Afternoon Reminder?"
                  value={selectedDate.afternoon}
                  onChange={handleAfternoon}
                  name="afternoon_prompt"
                  inputVariant="outlined"
                />

                <TimePicker
                  autoOk
                  label="Evening Reminder?"
                  value={selectedDate.evening}
                  onChange={handleEvening}
                  name="evening_prompt"
                  inputVariant="outlined"
                />

                <Autocomplete
                  id="combo-box-demo"
                  options={allTimeZones}
                  style={{ width: 300 }}
                  onChange={handleTimeZoneSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="What's Your Time Zone?"
                      variant="outlined"
                    />
                  )}
                  value={selectedTZ}
                />
              </CardContent>
              <CardActions className={classes.cardButton}>
                <Button
                  name="save_notifications"
                  onClick={submitSettings}
                  variant="contained"
                  color="primary"
                >
                  Save Timings
                </Button>
              </CardActions>
            </Card>
          </form>
        </div>
      </Box>
    </Container>
  )
}

export default UserSettings
