import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

import Service from "../service";

const ExerciseEditScreen = (props) => {
  const { id } = useParams();

  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const exerciseData = await Service.getExerciseById(id);
      if (exerciseData) {
        setUsername(exerciseData.username);
        setDescription(exerciseData.description);
        setDuration(exerciseData.duration);
        setDate(Date.parse(exerciseData.date));
      }

      const usersData = await Service.getUsers();
      if (usersData && usersData.length) {
        setUsers(usersData.map((user) => user.username));
      }
    };
    loadData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      id,
      username,
      description,
      duration,
      date: dayjs(date).toISOString(),
    };

    console.log(exercise);

    const submit = async () => {
      const responseData = await Service.updateExercise(exercise);
      console.log(
        `Update exercise response data ${JSON.stringify(responseData)}`
      );
    };
    submit();
    window.location = "/";
  };

  const userInput = useRef(null);

  return (
    <div className="container">
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            ref={userInput}
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >
            {users.length &&
              users.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
            type="text"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default ExerciseEditScreen;
