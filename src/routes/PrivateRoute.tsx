import { Redirect, Route } from 'react-router-dom'
import { auth } from '../connection/firebase'

const PrivateRoute = ({ ...props }) => {
  console.log(auth.currentUser)
  if (auth.currentUser) {
    return <Route {...props} />
  } else {
    return <Redirect to="/" />
  }
}

export default PrivateRoute
