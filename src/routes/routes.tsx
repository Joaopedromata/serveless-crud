import { Route, Switch } from 'react-router-dom'
import Core from '../pages/Core'
import CreateUser from '../pages/CreateUser'
import SendMail from '../pages/SendMail'
import SignIn from '../pages/SignIn'
import UpdatePassword from '../pages/UpdatePassword'
import PrivateRoute from './PrivateRoute'

const Router = () => (
    <Switch>
      <Route path="/create-user" component={CreateUser} />
      <Route path="/" component={SignIn} exact/>
      <Route path="/send-mail" component={SendMail} />
      <PrivateRoute path="/core" component={Core} />
      <PrivateRoute path="/update-password" component={UpdatePassword} />
    </Switch>
)

export default Router
