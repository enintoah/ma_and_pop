export type userLoginDataObject = {
  email: string,
  password: string
}

export type userSignupDataObject = {
  handle: string,
  email: string,
  password: string,
  password2: string
}

export type loginErrorsObject = {
  email?: string,
  password?: string
}

export type frontendErrorsObject = {
  passwordLength: string,
  passwordsMatch: string,
  emailEmpty: string,
  handleEmpty: string,
  passwordEmpty: string 
}