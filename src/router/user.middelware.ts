/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import { Gif } from "src/interfaces/gif";
import { message } from "antd";

export const ProtectedUser = ({ children }: any) => {
  const { isAuthenticated } = useAuth0()
  const { dbUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [dbUser]);

  return children;
};

export const ProtectedGif = ({ children }: any) => {
  const { gifId } = useParams()
  const { dbUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [isOwnGif, setIsOwnGif] = useState(false)

  useEffect(() => {
    try {
      dbUser.gifs.forEach((gif: Gif) => {
        if (gif._id.toString() === gifId) {
          setIsOwnGif(true)
        }
      });

    } finally {
      if (!isOwnGif) {
        message.warning('Unathorized')
        navigate('/')
      }
    }
  }, [dbUser, gifId]);

  return children;
};