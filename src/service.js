import apisauce from "apisauce";

const api = apisauce.create({
  baseURL: "http://localhost:5000/tracker",
  timeout: 10000,
});

const logError = (response) => {
  console.log(`Error ${response.status} - ${response.problem}`);
};

const handleResponse = (response) => {
  if (response && response.ok) {
    return response.data;
  } else {
    logError(response);
    return null;
  }
};

const getExercises = async () => {
  const response = await api.get("/exercises");
  return handleResponse(response);
};

const deleteExercise = async (id) => {
  const response = await api.delete(`/exercises/${id}`);
  if (response.ok) {
    return true;
  } else {
    logError(response);
    return false;
  }
};

const getExerciseById = async (id) => {
  const response = await api.get(`/exercises/${id}`);
  return handleResponse(response);
};

const getUsers = async () => {
  const response = await api.get("/users");
  return handleResponse(response);
};

const updateExercise = async (exercise) => {
  const { id } = exercise;
  delete exercise.id;
  const response = await api.post(`/exercises/update/${id}`, exercise);
  return handleResponse(response);
};

const createUser = async (user) => {
  const response = await api.post("/users/add", user);
  return handleResponse(response);
};

const addExercise = async (exercise) => {
  const response = await api.post("/exercises/add", exercise);
  return handleResponse(response);
};

const Service = {
  getExercises,
  deleteExercise,
  getExerciseById,
  getUsers,
  updateExercise,
  createUser,
  addExercise,
};

export default Service;
