import useAuthContext from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";

const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext();

  const logout = () => {
    //remove user from local storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({
      type: "logout",
    });

    //resets global workouts state to null after a user logs out.
    //This resolve another users workouts flashing on screen before the current users workouts load
    workoutsDispatch({
      type: "get-workouts",
      payload: null,
    });
  };

  return { logout };
};

export default useLogout;
