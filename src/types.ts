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
    age: number,
    maritalStatus: string,
    identification: string,
    city: string,
    state: string
  }
  uuid: string

}
