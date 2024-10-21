// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()
function AuthProvider(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [user, setUser] = useState({})
  const [isLogin, setLogin] = useState(false)
  const [isToken, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>  {
    const storedJwt = localStorage.getItem("jwt");
    if (storedJwt) {
      setLogin(true);
      setToken(storedJwt);
    }
    setIsLoading(false);
  }, [])

  const handleContextLogin = (username, AT) => {
    setUser(username)
    setLogin(true);
    setToken(AT);
    localStorage.setItem("token", isToken);
  }

  const handleContextLogout = () => {
    setUser(null)
    setLogin(false);
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    isLogin,
    isLoading,
    isToken,
    handleContextLogin,
    handleContextLogout,
  };
  return (
    <AuthContext value={value} {...props}></AuthContext>
  )
}

export { AuthProvider }; //?
