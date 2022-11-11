import {withRouter} from 'react-router-dom'


const useOnlyLoggedOut = (history :any, loggedIn: boolean) => {
  if (loggedIn) {
    history.push('/profile')
  }
}

export default useOnlyLoggedOut