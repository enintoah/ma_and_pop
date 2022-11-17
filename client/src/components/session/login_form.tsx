import React, { useState, useContext } from "react";
import {userLoginDataObject, loginErrorsObject} from './../../types/session'
import { login, setAuthToken } from "../../utils/session_api_util";
import { withRouter } from 'react-router-dom'
import { sessionContext } from './../../index'
import useOnlyLoggedOut from "../customHooks/loggedOutOnly";



const LoginForm = ({ history }: any) => {
  const [credentials, updateCredentials] = useState<userLoginDataObject>({email: "", password: ""})
  const [errors, updateErrors] = useState<loginErrorsObject>({})

  const session = useContext(sessionContext)

  useOnlyLoggedOut(history, session.loggedIn)

  const update = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>):void => {
      updateCredentials({...credentials, [field]: e.currentTarget.value})
    }
  }

  const submit = () => {
    login(credentials)
      .then((res: any) => {
        const { token } = res.data
        localStorage.setItem("jwtToken", token)
        setAuthToken(token)
        history.push('/profile')
      })
      .catch( (err: any) => {
        updateErrors(err.response.data)
      })
  }

  return (
    <div>
      <div>{errors.email ? errors.email : ""}</div>
      <div>{errors.password ? errors.password : ""}</div>
      <label>Email:
        <input type="text" defaultValue={credentials?.email} onChange={ update('email') }/>
      </label>
      <label>Password: 
        <input type="password" onChange={ update('password') }/>
      </label>
      <button onClick={submit}>
        Submit
      </button>

    </div>
  )

}

export default withRouter(LoginForm)