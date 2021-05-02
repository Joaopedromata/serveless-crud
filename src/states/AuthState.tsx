import { createContext, ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../connection/firebase'

export interface IAuthState {
  signUp: (email: string, password: string) => void
  signIn: (email: string, password: string) => void
  updatePassword: (newPassword: string) => void
  sendMail: (email: string) => void
  user: any
}

const initialState: IAuthState = {
  signUp: () => undefined,
  signIn: () => undefined,
  updatePassword: () => undefined,
  sendMail: () => undefined,
  user: {}
}

export const AuthContext = createContext(initialState)

const AuthState = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>({})

  const history = useHistory()

  const signUp = (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => { console.log(userCredential.user) })
      .catch(e => console.log(e.message))
  }

  const signIn = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(() => history.push('/core'))
      .catch(e => console.log(e.message))
  }

  useEffect(() => {
    setUser(auth.currentUser)
  }, [signIn, signUp])

  const updatePassword = (newPassword: string) => {
    auth.currentUser?.updatePassword(newPassword).then(() => {
      console.log('dasdhssoiuahdiuhsi')
    }).catch((e: any) => console.log(e))
  }

  const sendMail = (email: string) => {
    auth.languageCode = 'pt-BR'
    auth.sendPasswordResetEmail(email).then(() => {
      console.log('email')
    }).catch(e => {
      console.log(e)
    })
  }

  const contextValue = {
    signUp,
    signIn,
    sendMail,
    updatePassword,
    user
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthState
