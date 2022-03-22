import { useReducer, useRef } from "react";
import reducer, { initState } from "./reducer";
import { setJob, addJob, deleteJob } from "./actions";
import logger from "./logger";

export default function ToDo() {
  const [state, dispatch] = useReducer(logger(reducer), initState);
  const { job, jobs } = state;
  const inputRef = useRef();

  const handleSubmit = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));

    inputRef.current.focus();
  };

  return (
    <div style={{ padding: 30 }}>
      <h3>Todo</h3>
      <input
        ref={inputRef}
        value={job}
        placeholder="Enter todo ..."
        onChange={(e) => {
          dispatch(setJob(e.target.value));
        }}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => {
          return (
            <li key={index}>
              {job}
              <span
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(deleteJob(index))}
              >
                &times;
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
