import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSnackbar } from "notistack";
import axios from "axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const { dispatch } = useContext(AuthContext);

  const signup = async (username, email, password) => {
    setIsLoading(true);
    setError(null);

    // const response = await axios.post(
    //   "http://localhost:4000/api/auth/register",
    //   {
    //     username,
    //     email,
    //     password,
    //   }
    // );

    const response = await fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      setEmptyFields(json.emptyFields);
      enqueueSnackbar("Sign up error. Please Try again", { variant: "error" });
    }

    if (response.ok) {
      // save the user to the localStorage
      localStorage.setItem("User", JSON.stringify(json));

      //   update AuthContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
      setError(null);
      enqueueSnackbar("You signed up successfuly", { variant: "success" });
    }
  };

  return { signup, error, emptyFields, isLoading };
};
