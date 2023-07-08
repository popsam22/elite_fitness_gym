import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import useAuthContext from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [repititions, setRepititions] = useState(0);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const loadHandler = (e) => {
    setLoad(e.target.value);
  };

  const repititionsHandler = (e) => {
    setRepititions(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    //only allow users to add new workout
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const workout = { title, load, repititions };

    //fetch request to post new workout
    const data = await fetch("http://localhost:4001/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await data.json();

    if (!data.ok) {
      setError(json.error);
      setEmptyFields(json.containerForEmptyFields);
    }
    if (data.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setRepititions(0);
      setEmptyFields([]);
      dispatch({
        type: "add-workout",
        payload: json,
      });
    }
  };

  return (
    <div className="workout__form" onSubmit={submitHandler}>
      <form>
        <h2>Add new workout</h2>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={titleHandler}
          className={
            emptyFields && emptyFields.includes("title") ? "error" : ""
          }
        />
        <label>Load (in lbs):</label>
        <input
          type="number"
          value={load}
          onChange={loadHandler}
          className={emptyFields && emptyFields.includes("load") ? "error" : ""}
        />
        <label>Repititions:</label>
        <input
          type="text"
          value={repititions}
          onChange={repititionsHandler}
          className={
            emptyFields && emptyFields.includes("repititions") ? "error" : ""
          }
        />

        {error && (
          <div className="workout__form-error">
            <h4>{error}</h4>
          </div>
        )}
        <button type="submit">Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;

//fix the red border not showing for emptyFields array in the css as well
