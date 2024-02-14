import { useContext } from "react";
import { JWTToken } from "app/config/constant";
import Context from "app/contexts/context";

export default function useAuth() {
  const { dispatch } = useContext(Context);
  
  async function authRendered(authData) {
    dispatch({ type: "IS_RENDERED", payload: true });
  }

  async function login(loginData) {
    localStorage.setItem(JWTToken, JSON.stringify(loginData));
    dispatch({ type: "LOGIN_USER", payload: loginData });
    dispatch({ type: "IS_LOGGED_IN", payload: true });
  }

  function logout() {
    localStorage.removeItem(JWTToken);
    dispatch({ type: "LOGIN_USER", payload: {} });
    dispatch({ type: "IS_LOGGED_IN", payload: false });
  }

  return {
    authRendered,
    login,
    logout
  };
}
