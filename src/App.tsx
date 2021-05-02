import { BrowserRouter } from 'react-router-dom'
import Router from './routes/routes'
import AuthState from './states/AuthState'

function App () {
  return (
    <BrowserRouter>
      <AuthState>
        <Router />
      </AuthState>
    </BrowserRouter>
  )
}

export default App
