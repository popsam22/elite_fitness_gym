import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";
import { FaTrash } from "react-icons/fa";

//date-fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const deleteHandler = async () => {
    //only allow users to delete workouts
    if (!user) {
      return;
    }

    const data = await fetch(
      `http://localhost:4001/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await data.json();
    if (data.ok) {
      dispatch({
        type: "delete-workout",
        payload: json,
      });
    }
  };

  return (
    <div className="workout__details">
      <h2>{workout.title}</h2>
      <p>
        <strong> Load (lbs): </strong> {workout.load}
      </p>
      <p>
        <strong> Repititions:</strong>
        {workout.repititions}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span
        onClick={deleteHandler}
        style={{ fontSize: "25px", color: "#e7195a " }}
      >
        <FaTrash />
      </span>
    </div>
  );
};

export default WorkoutDetails;
