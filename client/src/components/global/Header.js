import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none'
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          <Link component={RouterLink} to="/">
            You Good, Fam?
          </Link>
        </Typography>
        <nav>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="#"
            className={classes.link}
          >
            Features
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="#"
            className={classes.link}
          >
            Why Track Your Mood?
          </Link>
          <Link
            component={RouterLink}
            variant="button"
            color="textPrimary"
            to="#"
            className={classes.link}
          >
            Support
          </Link>
        </nav>
        <Button
          component={RouterLink}
          to="/login"
          color="primary"
          className={classes.link}
        >
          Login
        </Button>
        <Button component={RouterLink} to="/sign-up" color="primary">
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  )
}
