import React, { useState, useEffect } from "react";

const ProfileEdit = () => {
  const [user, setUser] = useState({});

  console.log("render", user);

  useEffect(() => {
    console.log("useEffect");
    async function loadUsers() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const userFromAPI = await response.json();
      console.log("setUser", userFromAPI);
      setUser(userFromAPI);
    }
    loadUsers();
  }, []); // `user.id` is truthy after the API call returns

  useEffect(() => {
    if (user.name) {
      document.title = `${user.name} : Edit Profile`;
    } else {
      document.title = "Edit Profile";
    }
  }, [user]); //Rerun this effect when the user changes

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify(user)
      }
    );
    const savedData = await response.json();
    console.log("Saved user!", savedData);
  };

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  if (user.id) {
    // `user.id` is truthy after the API call returns
    return (
      <form name="profileEdit">
        <div>
          <label htmlFor="username">User Name:</label>
          <input
            id="username"
            name="username"
            type="text"
            value={user.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={changeHandler}
          />
        </div>
        <button
          className="btn btn-secondary"
          type="submit"
          onClick={submitHandler}
        >
          Submit
        </button>
      </form>
    );
  }
  return "Loading...";
};

export default ProfileEdit;
