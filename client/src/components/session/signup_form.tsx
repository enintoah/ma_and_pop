import React, { useState, useEffect } from "react"
import { userSignupDataObject, frontendErrorsObject } from "../../types/session"
import { signup, setAuthToken} from "../../utils/session_api_util"
import { withRouter } from 'react-router-dom'


const SignupForm = ({history}: any) => {
  const [credentials, updateCredentials] = useState<userSignupDataObject>({handle: "", email: "", password: "", password2: ""})
  const [backendErrors, updateBackendErrors] = useState()
  const [frontendErrors, updateFrontendErrors] = useState<frontendErrorsObject>({emailEmpty: "", handleEmpty: "", passwordLength: "", passwordsMatch: "", passwordEmpty: ""})

  useEffect(() => {
    if (credentials.password2.length > 0 && credentials.password.length > 0) {
      console.log('bruh')
      updateFrontendErrors({...frontendErrors, passwordEmpty: ""})
    }

    if (credentials.email !== "") {
      updateFrontendErrors({...frontendErrors, emailEmpty: ""})
    }

    if (credentials.handle !== "") {
      updateFrontendErrors({...frontendErrors, handleEmpty: ""})
    }

    if (credentials.password !== "" && credentials.password.length < 6) {
      updateFrontendErrors({...frontendErrors, passwordLength: "Password must be 6 characters or longer"})
    } else if (frontendErrors.passwordLength !== "") {
      updateFrontendErrors({...frontendErrors, passwordLength: ""})
    }

    if (credentials.password2 !== "" && credentials.password !== credentials.password2) {
      updateFrontendErrors({...frontendErrors, passwordsMatch: "Passwords must match"})
    } else if (frontendErrors.passwordsMatch !== ""){
      updateFrontendErrors({...frontendErrors, passwordsMatch: ""})
    }
  
  }, [credentials])  

  const update = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>):void => {
      updateCredentials({...credentials, [field]: e.currentTarget.value})
    }
  }

  async function submit() {
    let credentialsValid = true 
    if (credentials.email === "") {
      updateFrontendErrors({...frontendErrors, emailEmpty: "Email must not be blank"})
      credentialsValid = false
    }
    else if (credentials.handle === "") {
      updateFrontendErrors({...frontendErrors, handleEmpty: "Handle must not be blank"})
      credentialsValid = false 
    }
    else if (credentials.password === "" || credentials.password2 === "") {
      updateFrontendErrors({...frontendErrors, passwordEmpty: "Password must not be blank"})
      credentialsValid = false 
    }

    if (!credentialsValid || frontendErrors.passwordLength !== "" || frontendErrors.passwordsMatch !== "") {
      console.log(credentials)
    } else {
      signup(credentials)
        .then((res: any) => {
          const { token } = res.data
          localStorage.setItem("jwtToken", token)
          setAuthToken(token)
          history.push('/profile')
        })
        .catch((err: any) => {
          console.log(err.response.data)
          updateBackendErrors(err.response.data)
        })  
    }

  }


  return (
    <div>
      <div>{frontendErrors.emailEmpty}</div>
      <div>{frontendErrors.handleEmpty}</div>
      <div>{frontendErrors.passwordEmpty}</div>
      <div>{frontendErrors.passwordLength}</div>
      <div>{frontendErrors.passwordsMatch}</div>
      <label>Name:
        <input type="text" defaultValue={credentials?.handle} onChange={ update('handle') }/>
      </label>
      <label>Email: 
        <input type="text" defaultValue={credentials?.email} onChange={ update('email') }/>
      </label>
      <label>Password:
        <input type="password" onChange={ update('password') }/>
      </label>
      <label>Confirm Password:
        <input type="password" onChange={ update('password2') } />
      </label>
      <button onClick={submit}>Submit</button>
    </div>
  )
}

export default withRouter(SignupForm)