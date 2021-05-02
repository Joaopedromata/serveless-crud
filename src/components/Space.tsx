import styled from 'styled-components'

interface Props {
  height: string
  className?: string
}

const Space = ({ className }: Props) => <div className={className} />

export default styled(Space)`
  height: ${props => props.height};
`
