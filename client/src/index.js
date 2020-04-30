import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import App from './App'
import { AuthProvider } from './providers/Auth'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
