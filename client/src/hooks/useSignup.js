import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true); //sign up request is just getting started.
    setError(null); //incase we make a bad request, this resets the error to its original state

    //function to send request to backend to sign users up
    const data = await fetch("http://localhost:4001/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = await data.json();

    if (!data.ok) {
      setError(json.error);
      setIsLoading(false);
    }

    if (data.ok) {
      //store the email & jwt received in the browser for a certain user
      localStorage.setItem("user", JSON.stringify(json));

      //update authcontext with email we get from data
      dispatch({
        type: "login",
        payload: json,
      });

      //update the loading state to false
      setIsLoading(false);
    }
  };
  return { isLoading, error, signup };
};

export default useSignup;
