import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import ModalExerciseTracker from "../components/modal";

import Service from "../service";

const Exercise = ({ exercise, deleteExercise }) => {
  const history = useHistory();
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{dayjs(exercise.date).format("DD/MM/YYYY")}</td>
      <td>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => {
            history.push(`/edit/${exercise._id}`);
          }}
        >
          Edit
        </button>{" "}
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            deleteExercise(exercise._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const ExercisesListScreen = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    async function loadExercises() {
      const ex = await Service.getExercises();
      setExercises(ex || []);
    }
    loadExercises();
  }, []);

  const deleteExercise = (id) => {
    setId(id);
    setShowModal(true);
  };

  const exerciseList = () => {
    if (!exercises.length) {
      return <></>;
    }
    return exercises.map((ex) => {
      return (
        <Exercise exercise={ex} deleteExercise={deleteExercise} key={ex._id} />
      );
    });
  };

  const handleDelete = () => {
    try {
      if (Service.deleteExercise(id)) {
        setExercises(exercises.filter((el) => el._id !== id));
      }
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="container">
      {showModal && (
        <ModalExerciseTracker
          show={showModal}
          handleOk={handleDelete}
          handleClose={() => setShowModal(false)}
          body="Are you sure you wanna delete this exercise?"
        />
      )}
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesListScreen;
