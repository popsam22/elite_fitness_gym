import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from '../hooks/useWorkoutsContext'
import useAuthContext from '../hooks/useAuthContext'


const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const workoutsData = async () => {
      const data = await fetch("https://elite-fitness-gym.onrender.com/api/workouts", {
        headers: {
          "Authorization": `Bearer ${user.token}`
        }
      });
      const json = await data.json(); //returns workouts in json format

      if (data.ok) {
        dispatch({
          type: "get-workouts",
          payload: json
        })
      }
    };

    if(user){
      workoutsData();
    }
  }, [dispatch, user]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="home">
      <div className="home__workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;