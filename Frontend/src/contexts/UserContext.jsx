import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"))
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("auth")))

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch("http://127.0.0.1:8000/users/me", requestOptions);

      if (!response.ok) {
        setToken(null)
        setAuth(null)
        localStorage.setItem("auth", null)
      } else {
        let user = await response.json()
        let username = user.username
        let role = user.role
        setAuth({ username, role })
        localStorage.setItem("auth", JSON.stringify({ username, role }))
      }
      localStorage.setItem("accessToken", token);
    };
    fetchUser();
  }, [token]);

  return (
    <UserContext.Provider value={[token, setToken, auth, setAuth]}>
      {props.children}
    </UserContext.Provider>
  );
};