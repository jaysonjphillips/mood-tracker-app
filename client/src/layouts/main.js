import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },

  paperNoCenter: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}))

export default ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2} />
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={2} />

        {/*  Footer */}
        <Grid item xs={2}>
          Modules
        </Grid>
        <Grid item xs={8} />
        <Grid item xs={2}>
          modules
        </Grid>
      </Grid>
    </div>
  )
}
