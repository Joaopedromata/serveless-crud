import { Redirect, Route } from 'react-router-dom'
import { auth } from '../connection/firebase'

const PrivateRoute = ({ ...props }) => {
  if (auth.currentUser) {
    return <Route {...props} />
  } else {
    return <Redirect to="/" />
  }
}

export default PrivateRoute
