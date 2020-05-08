import React, { useEffect } from 'react'
import { Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export default (props) => {
  const { alertTitle, alertMessage, alertType, showAlert, setShowAlert } = props

  useEffect(() => {
    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }, [setShowAlert])

  
  return (
    <Collapse in={showAlert}>
      <Alert severity={alertType} onClose={() => setShowAlert(false)}>
        <AlertTitle>{alertTitle}</AlertTitle>
        {alertMessage || ''}
      </Alert>
    </Collapse>
  )
}
