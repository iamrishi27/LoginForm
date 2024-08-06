import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register = await axios.post("http://localhost:5000/register", value);
      console.log(register.data);
      setValue({
        name: "",
        email: "",
        password: "",
      });
      alert("Account created successfully!");
    } catch (error) {
      console.error('Error during account creation:', error);
      alert('Error creating account. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={handleChange}
          value={value.name}
          name="name"
          required
        />
        <input
          placeholder="Email"
          onChange={handleChange}
          value={value.email}
          name="email"
          type="email"
          required
        />
        <input
          placeholder="Password"
          value={value.password}
          onChange={handleChange}
          name="password"
          type="password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
