import useAuthContext from "./useAuthContext";
import { useState } from "react";

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    const data = await fetch("https://elite-fitness-gym.onrender.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await data.json(); //contains user and token

    if (!data.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (data.ok) {
      //dispatch a login action
      dispatch({
        type: "login",
        payload: json,
      }); 

      //store the email & jwt received in the browser for a certain user
      localStorage.setItem("user", JSON.stringify(json));

       //update the loading state to false
       setIsLoading(false);

    }
  };
  return {isLoading, error, login}
};

export default useLogin;
