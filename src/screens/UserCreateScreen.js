import React, { useState } from "react";

import Service from "../service";

const UserCreateScreen = (props) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
    };

    const submit = async () => {
      const responseData = await Service.createUser(user);
      console.log(`Create user response data ${JSON.stringify(responseData)}`);
    };
    submit();

    setUsername("");
    return true;
  };

  return (
    <div className="container">
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create User"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default UserCreateScreen;
