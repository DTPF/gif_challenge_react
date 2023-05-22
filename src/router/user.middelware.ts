import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/user/UserContext";

export const ProtectedUser = ({ children }: any) => {
  const { isAuthenticated } = useAuth0()
  const { dbUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser]);

  return children;
};