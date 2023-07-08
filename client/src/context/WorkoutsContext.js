import { createContext, useReducer } from "react";

const WorkoutsContext = createContext();

//action types constant
const GET_WORKOUTS = "get-workouts";
const CREATE_WORKOUT = "add-workout";
const DELETE_WORKOUT = "delete-workout"

const workoutsReducer = (state, action) => {
  if (action.type === GET_WORKOUTS) {
    return {
      workouts: action.payload,
    };
  }
  if (action.type === CREATE_WORKOUT) {
    return {
      workouts: [action.payload, ...state.workouts],
    };
  }
  if(action.type === DELETE_WORKOUT){
    return{
      //returns the undeleted workouts
      workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
    }
  }
  return state;
};

const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, {
    workouts: null,
  });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};

export { WorkoutsContext, workoutsReducer };
export default WorkoutsContextProvider;
