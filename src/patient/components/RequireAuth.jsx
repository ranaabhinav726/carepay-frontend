import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'

export const RequireAuth = ({ children }) => {
  const auth = useAuth()
  if (!auth.user) {
    return <Navigate to='/login' />
  }
  // console.log(children);
  //check the step number the user is on and then check if current children is the same screen,
  //if not, navigate to respective screen
  return children
}