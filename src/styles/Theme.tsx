import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { ITheme } from '../types'

const theme: ITheme = {
  primaryColor: '#0275d8',
  secondaryColor: '#5bc0de',
  white: '#fff',
  fontColor: '#727272',
  gray: '#C4C4C4',
  lightGray: '#F6F6F6'
}

interface Props {
    children: ReactNode
}

const Theme = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default Theme
