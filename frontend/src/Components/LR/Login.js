import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useGlobalContext();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: email, password: password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h3>Login Here</h3>

      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        value={email}
        onChange={handleEmail}
        placeholder="Email"
      />

      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        value={password}
        onChange={handlePassword}
        placeholder="Password"
      />
      <Button>Log In</Button>
    </Form>
  );
};


const Form = styled.form`
  // width: 30%;
   width: 100%; /* Adjust the width for desktop screens */
  max-width: 400px; /* Limit the maximum width for larger screens */
  margin: 0 auto; /* Center the form horizontally on all screens */
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  margin-left: 50%; /* Center the form horizontally on larger screens */
  margin-top: 500px;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 2rem;

  @media screen and (max-width: 768px) {
    width: 90%; /* Adjusted width for smaller screens */
    margin: 1rem auto; /* Center the form horizontally on smaller screens */
    position: relative;
    transform: none;
    margin-top: 20%;
    margin-bottom: 20%;
    // height:500px;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem; /* Adjust margin for smaller screens */
  font-size: 1rem;

`;

const Input = styled.input`
  display: block;
  height: 3rem;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0.5rem; /* Adjust padding for smaller screens */
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 300;

`;

const Button = styled.button`
  margin-top: 2rem;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 1.2rem;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;

`;

export default Login;
