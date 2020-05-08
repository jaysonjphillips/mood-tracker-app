import React, { useState, useMemo, useContext, useEffect } from 'react'
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
import SelectMenu from '../components/controls/SelectMenu'
import moment from 'moment-timezone'
import { inputChangeHandler } from '../lib/eventHandlers'
import FormAlert from '../components/FormAlert'
import { doPost, doPut, doGet } from '../lib/fetch'
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
  const time_zone_guess = moment.tz.guess()

  const initialPasswordState = {
    password: '',
    confirm_password: ''
  }

  const initialSettingsState = {
    phone: '',
    morning: '',
    afternoon: '',
    evening: '',
    time_zone: user.settings && user.settings.time_zone || time_zone_guess
  }


  const listOfTimeZones = useMemo(() => moment.tz.names(), [])
  // const listOfTimeZones = ['America/New_York', 'America/Los_Angeles', '', null]

  // updating the user profile 
  const [profileState, setProfileState] = useState(user.profile)

  const [passwordState, setPasswordState] = useState(initialPasswordState)

  const [userSettings, setUserSettings] = useState(initialSettingsState)

  const [allTimeZones] = useState(listOfTimeZones)

  const [formResponse, setFormResponse] = useState({
    title: '',
    message: '',
    type: 'success'
  })

  const [showAlert, setShowAlert] = useState(false)

  const handleInput = (event) => {
    inputChangeHandler(event, [profileState, setProfileState])
  }

  const handlePasswordInput = (event) => {
    inputChangeHandler(event, [passwordState, setPasswordState])
  }

  const handleTimeZoneSelect = (event, newValue) => {
    event && event.persist()
    setUserSettings({
      ...userSettings,
      time_zone: newValue
    })
  }

  const handleSelectedDate = (name, newValue) => {
    // event.persist();
    setUserSettings({
      ...userSettings,
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
    const result = await resp
    if (!resp.ok) {
      await setFormResponse({
        type: 'error',
        title: 'Error',
        message: `${result.message || result.statusText}`
      })
    } else {
      await setFormResponse({
        type: 'success',
        title: 'Success',
        message: result.message || result.statusText
      })
    }
    setShowAlert(true)
  }

  const submitProfile = async (event) => {
    event.persist()

    const resp = await doPut(
      `/api/user`,
      JSON.stringify({
        email: profileState.email,
        first_name: profileState.first_name,
        last_name: profileState.last_name,
        phone: profileState.phone
      }),
      true
    )

    handleFormResponse(resp)
  }

  const submitPasswordChange = async (event) => {
    event.persist()
    const resp = await doPut(
      `/api/user`,
      JSON.stringify({
        password: passwordState.password,
        confirm_password: passwordState.confirm_password
      }),
      true
    )

    handleFormResponse(resp)
  }

  const submitSettings = async (event) => {
    const resp = await doPost(
      '/api/user/settings',
      JSON.stringify({
        phone: profileState.phone,
        morning: userSettings.morning,
        afternoon: userSettings.afternoon,
        evening: userSettings.evening,
        time_zone: userSettings.time_zone
      }),
      true
    )

    handleFormResponse(resp)
  }

  useEffect(() => {
    doGet(`/api/user/settings?id=${moment().valueOf()}`, true)
    .then(async response => {
      const result = await response
      if(response.ok) {
        const {UserSetting} = await result.json()
        
        if(UserSetting) {
          setUserSettings({
            morning: UserSetting.morning,
            afternoon: UserSetting.afternoon, 
            evening: UserSetting.evening
          }) 
        }
      }
    })
    //handle updating state
  }, [setUserSettings])

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
                  value={profileState.first_name}
                />

                {/* {password input} */}
                <TextField
                  label="Last Name"
                  name="last_name"
                  fullWidth
                  variant="outlined"
                  onChange={handleInput}
                  value={profileState.last_name}
                />

                <TextField
                  label="Email"
                  name="email"
                  fullWidth
                  variant="outlined"
                  onChange={handleInput}
                  value={profileState.email}
                />

                <TextField
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  pattern="/^1?[-\. ]?(\(\d{3}\)?[-\. ]?|\d{3}?[-\. ]?)?\d{3}?[-\. ]?\d{4}$/"
                  fullWidth
                  variant="outlined"
                  onChange={handleInput}
                  value={profileState.phone}
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
                  onChange={handlePasswordInput}
                  value={passwordState.password}
                />

                <TextField
                  label="Password"
                  type="password"
                  name="confirm_password"
                  fullWidth
                  variant="outlined"
                  onChange={handlePasswordInput}
                  value={passwordState.confirm_password}
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
                
              {/*TODO: clean up getting the time into and out of picker  */}
                <TimePicker
                  autoOk
                  label="Morning Reminder?"
                  value={userSettings.morning || moment()}
                  onChange={handleMorning}
                  name="morning_prompt"
                  inputVariant="outlined"
                />

                <TimePicker
                  autoOk
                  label="Afternoon Reminder?"
                  value={userSettings.afternoon || moment()}
                  onChange={handleAfternoon}
                  name="afternoon_prompt"
                  inputVariant="outlined"
                />

                <TimePicker
                  autoOk
                  label="Evening Reminder?"
                  value={userSettings.evening || moment()}
                  onChange={handleEvening}
                  name="evening_prompt"
                  inputVariant="outlined"
                />

                {/*TODO: Change component handling of state & selection  */}
                <SelectMenu label="What's Your Time Zone?" options={allTimeZones} name='time_zone' value={userSettings.time_zone} />
                {/* <Autocomplete
                  id="combo-box-demo"
                  options={allTimeZones}
                  style={{ width: 300 }}
                  onChange={handleTimeZoneSelect}
                  defaultValue={allTimeZones[allTimeZones.indexOf(userSettings.time_zone)] || null}
                  getOptionSelected={(option, time_zone) => option = time_zone}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="What's Your Time Zone?"
                      variant="outlined"
                    />
                  )}
                  // value={userSettings.time_zone}
                /> */}
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
