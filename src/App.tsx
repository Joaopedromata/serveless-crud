import { BrowserRouter } from 'react-router-dom'
import Container from './components/Container'
import ToastMessage from './components/ToastMessage'
import Router from './routes/routes'
import AuthState from './states/AuthState'
import GlobalStyles from './styles/GlobalStyles'
import Theme from './styles/Theme'

function App () {
  return (
    <BrowserRouter>
      <ToastMessage />
      <AuthState>
        <Theme>
          <GlobalStyles />
          <Container>
            <Router />
          </Container>
        </Theme>
      </AuthState>
    </BrowserRouter>
  )
}

export default App
