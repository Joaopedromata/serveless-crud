import { useContext } from 'react'
import { AuthContext } from '../states/AuthState'

const SignIn = () => {
  const { signIn } = useContext(AuthContext)
  return <button onClick={() => signIn('joaopmata182@gmail.com', '123456')}>djaoisjdoiasjd</button>
}

export default SignIn
