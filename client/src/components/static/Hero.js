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
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Because How You Feel, Matters
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" component="p">
        Maybe journaling is not your thing. And that's okay. But there's always a way to 
        be in tune with how you feel and to reach out to others in all times of life. With 
        a simple text message. We're here so you have a tool to ask yourself, "you good, fam?"
      </Typography>
    </Container>
  )
}
