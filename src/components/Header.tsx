import styled from 'styled-components'
import { FiLogOut } from 'react-icons/fi'
import logo from '../assets/logo.svg'
import { useContext } from 'react'
import { AuthContext } from '../states/AuthState'

interface Props {
  className?: string
}

const Header = ({ className }: Props) => {
  const { signOut } = useContext(AuthContext)
  return (
    <nav className={className}>
      <div className="wrapper">
        <img src={logo} alt="logo"/>
        <FiLogOut onClick={() => signOut()}/>
      </div>
    </nav>
  )
}

export default styled(Header)`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 90px;
  background: ${props => props.theme.white};
  color:  ${props => props.theme.fontColor};
  box-shadow: 0 4px 2px -2px #00000040;

  display: flex;
  align-items: center;
  justify-content: center;

  .wrapper {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    img {
      width: 100px;
    }

    svg {
      width: 30px;
      height: 30px;
      cursor: pointer;
      transition: filter 300ms;

      &:hover {
        filter: brightness(70%);
      }
    }

  }

`
