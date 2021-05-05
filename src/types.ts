export interface ITheme {
  primaryColor: string
  secondaryColor: string
  white: string
  fontColor: string
  gray: string
  lightGray: string
}

export interface IPerson {

  data: {
    name: string,
    age: number | string,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  }
  uuid: string
}

export interface IState {
  id: number
  nome: string
  regiao: any
  sigla: string
}

export interface ICity {
  id: number
  nome: string
  municipio: any
}
