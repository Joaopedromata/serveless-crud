import { useContext } from 'react'
import { AuthContext } from '../states/AuthState'

const UpdatePassword = () => {
  const { updatePassword } = useContext(AuthContext)
  return <button onClick={() => updatePassword('654321')}>dosadnhoiahdsoiahsiodhoaihdsoiahsds</button>
}

export default UpdatePassword
