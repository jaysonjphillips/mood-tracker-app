import React from 'react'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <Container maxWidth="sm" component="main" className={classes.heroContent}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Because How You Feel, Matters
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" component="p">
        Quickly build an effective pricing table for your potential customers with
        this layout. It&apos;s built with default Material-UI components with little
        customization.
      </Typography>
    </Container>
  )
}
