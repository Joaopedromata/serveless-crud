import { useContext } from 'react'
import { AuthContext } from '../states/AuthState'

const CreateUser = () => {
  const { signUp } = useContext(AuthContext)

  return <button onClick={() => signUp('joaopmata182@gmail.com', '123456')}>dnsajkndakjn</button>
}

export default CreateUser
