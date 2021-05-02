import { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { ITheme } from '../types'

const theme: ITheme = {
  primaryColor: '#F7CE5B',
  secondaryColor: '#755706',
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
