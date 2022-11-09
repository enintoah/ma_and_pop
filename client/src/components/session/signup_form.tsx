import React, { useState } from "react"
import { userSignupDataObject } from "../../types/session"

export const SignupForm = () => {
  const [credentials, updateCredentials] = useState<userSignupDataObject>({handle: "", email: "", password: "", password2: ""})

  const update = (field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>):void => {
      updateCredentials({...credentials, [field]: e.currentTarget.value})
    }
  }

  const submit = () => {

  }

  return (
    <div>
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
      <button>Submit</button>
    </div>
  )
}