import { useContext, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FlexVertical from '../components/FlexVertical'
import FloatingForm from '../components/FloatingForm'
import Space from '../components/Space'
import { AuthContext } from '../states/AuthState'

const SendMail = () => {
  const { sendMail } = useContext(AuthContext)
  const [email, setEmail] = useState<string>('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    sendMail(email)
  }

  return (
    <FloatingForm>
      <Form className="col-12" onSubmit={e => handleSubmit(e)}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            Exemplo: nome@exemplo.com.br
          </Form.Text>
        </Form.Group>
        <Space height="15px" />
        <FlexVertical height="90px">
          <Button type="submit" className="btn-block">Entrar</Button>
          <Link to="/create-user">Ainda não tenho conta</Link>
        </FlexVertical>
      </Form>
    </FloatingForm>
  )
}

export default SendMail
