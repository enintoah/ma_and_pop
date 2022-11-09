import React, { useState } from "react";
import {userLoginDataObject} from './../../types/session'
import { login } from "../../utils/session_api_util";

export const LoginForm = () => {
  const [credentials, updateCredentials] = useState<userLoginDataObject>({email: "", password: ""})

  const update = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>):void => {
      updateCredentials({...credentials, [field]: e.currentTarget.value})
    }
  }

  const submit = () => {
    login(credentials)
      .then(() => {
        
      })
  }

  return (
    <div>
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