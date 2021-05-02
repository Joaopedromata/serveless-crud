import { useContext } from 'react'
import { AuthContext } from '../states/AuthState'

const SendMail = () => {
  const { sendMail } = useContext(AuthContext)
  return <button onClick={() => sendMail('joaopmata182@gmail.com')}>dsadhiusdhiuashiudhiuh</button>
}

export default SendMail
