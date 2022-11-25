import { useContext } from "react"
import { sessionContext } from "../../index"

export const UserProfilePage = () => {
  const session = useContext(sessionContext)

  return (
    <div>
      <h1>This is the user profile page</h1>
      <h2>BORORSIETNOIRESNTOIE</h2>
    </div>
  )
}