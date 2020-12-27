import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import ExercisesList from "./screens/ExercisesListScreen";
import ExerciseCreateScreen from "./screens/ExerciseCreateScreen";
import ExerciseEditScreen from "./screens/ExerciseEditScreen";
import UserCreateScreen from "./screens/UserCreateScreen";

const App = () => {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/" exact component={ExercisesList} />
      <Route path="/create" component={ExerciseCreateScreen} />
      <Route path="/edit/:id" component={ExerciseEditScreen} />
      <Route path="/user" component={UserCreateScreen} />
    </Router>
  );
};

export default App;
