import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ ...props }) => {
  const user = localStorage.getItem('user')
  if (user) {
    return <Route {...props} />
  } else {
    return <Redirect to="/" />
  }
}

export default PrivateRoute
