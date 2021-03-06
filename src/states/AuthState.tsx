import { createContext, ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { auth } from '../connection/firebase'

export interface IAuthState {
  signUp: (email: string, password: string) => void
  signIn: (email: string, password: string) => void
  signOut: () => void
  updatePassword: (newPassword: string) => void
  sendMail: (email: string) => void
  user: any
}

const initialState: IAuthState = {
  signUp: () => undefined,
  signIn: () => undefined,
  signOut: () => undefined,
  updatePassword: () => undefined,
  sendMail: () => undefined,
  user: {}
}

export const AuthContext = createContext(initialState)

const AuthState = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>()

  const history = useHistory()

  const signUp = (email: string, password: string) => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        toast.success('Usuário criado com sucesso')
        history.push('')
      })
      .catch(e => toast.error(e.message))
  }

  const signIn = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password)
      .then(e => {
        if (e.user?.uid) {
          localStorage.setItem('user', e.user?.uid)
        }
        history.push('/core')
      })
      .catch(() => toast.error('Verifique as credenciais fornecidas'))
  }

  useEffect(() => {
    setUser(localStorage.getItem('user'))
  }, [signUp])

  const updatePassword = (newPassword: string) => {
    auth.currentUser?.updatePassword(newPassword).then(() => {
      history.push('/core')
      toast.success('Senha alterada com sucesso')
    }).catch(() => toast.error('Ocorreu um erro para alterar sua senha'))
  }

  const sendMail = (email: string) => {
    auth.languageCode = 'pt-BR'
    auth.sendPasswordResetEmail(email).then(() => {
      history.push('/')
      toast.success('Verifique a caixa de entrada do seu email')
    }
    ).catch(() => toast.error('Este email não existe em nosso sistema'))
  }

  const signOut = () => {
    localStorage.removeItem('user')
    history.push('/')
  }

  const contextValue = {
    signUp,
    signIn,
    signOut,
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
