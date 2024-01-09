import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();

  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem("User");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    // Logout Alert
    enqueueSnackbar("You logged out successfuly", { variant: "success" });
  };

  return { logout };
};

export default useLogout;
