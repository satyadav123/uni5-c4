// /orders and /neworder are protected routes
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
export const ProtectedRoute = ({ children }) => {
  const auth = useSelector(store => store.auth);

  if(!auth.isLoggedIn){
      return <Navigate to={"/login"} />
  }

  return children;
};
