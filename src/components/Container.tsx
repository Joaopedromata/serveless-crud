import { ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  children: ReactNode
  className?: string
}

const Container = ({ className, children }: Props) => {
  return <section className={className}>{children}</section>
}

export default styled(Container)`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.lightGray}
`
