import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  children: ReactNode
}

const FloatingContainer = ({ className, children }: Props) => {
  return (
    <div className={className}>{children}</div>
  )
}

export default styled(FloatingContainer)`
  padding: 30px;
  background: ${props => props.theme.white};
  box-shadow: 4px 4px 20px 2px #00000040;
  border-radius: 4px;
`
