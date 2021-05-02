import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import FloatingForm from '../components/FloatingForm'
import Space from '../components/Space'
import { AuthContext } from '../states/AuthState'

const UpdatePassword = () => {
  const { updatePassword } = useContext(AuthContext)
  const [password, setPassword] = useState<string>('')
  const [password2, setPassword2] = useState<string>('')

  const validateForm = (): boolean => {
    if (password.length < 8) {
      toast.error('Sua senha deve conter no mínimo 8 caracteres')
      return false
    } else if (password !== password2) {
      toast.error('As senhas não coincidem')
      return false
    } else {
      return true
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (validateForm()) {
      updatePassword(password)
    }
  }

  return (
    <FloatingForm>
      <Form className="col-12" onSubmit={e => handleSubmit(e)}>
        <Form.Group >
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group >
          <Form.Label>Repita sua senha</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
        </Form.Group>
        <Space height="15px" />
        <Button type="submit" className="btn-block">Criar Usuário</Button>
      </Form>
    </FloatingForm>
  )
}

export default UpdatePassword
