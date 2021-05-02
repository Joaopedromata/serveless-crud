import { ReactNode } from 'react'
import styled from 'styled-components'
import FloatingContainer from './FloatingContainer'
import logo from '../assets/logo.svg'
import { useHistory } from 'react-router'

interface Props {
  className?: string
  children: ReactNode
}

const FloatingForm = ({ className, children }: Props) => {
  const history = useHistory()

  return (
    <FloatingContainer>
      <div className={className}>
        <img src={logo} alt="logo" onClick={() => history.push('/')}/>
        {children}
      </div>
    </FloatingContainer>
  )
}

export default styled(FloatingForm)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: ${props => props.theme.fontColor};
  min-width: 400px;

  img {
    cursor: pointer;
    width: 200px;
    margin-bottom: 15px;
  }
`
