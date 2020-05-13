import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import App from './App'
import { AuthProvider } from './providers/Auth'
import AuthCheck from './components/global/AuthCheck'



ReactDOM.render(
    <AuthProvider>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AuthCheck />
        <App />
      </MuiPickersUtilsProvider>
    </AuthProvider>,
  document.getElementById('root')
)
