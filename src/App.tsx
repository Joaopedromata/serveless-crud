import { BrowserRouter } from 'react-router-dom'
import Container from './components/Container'
import ToastMessage from './components/ToastMessage'
import Router from './routes/routes'
import AuthState from './states/AuthState'
import CoreState from './states/CoreState'
import GlobalStyles from './styles/GlobalStyles'
import Theme from './styles/Theme'

function App () {
  return (
    <BrowserRouter>
      <ToastMessage />
      <AuthState>
        <CoreState>
          <Theme>
            <GlobalStyles />
            <Container>
              <Router />
            </Container>
          </Theme>
        </CoreState>
      </AuthState>
    </BrowserRouter>
  )
}

export default App
