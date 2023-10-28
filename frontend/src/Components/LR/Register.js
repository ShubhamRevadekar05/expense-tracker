import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const Background = styled.div`
  width: 100%;
  height: 20%;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const Form = styled.form`
  height: 32rem;
  width: 30rem;
  max-width: 25rem; /* Set a maximum width for larger screens */
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 2rem; /* Adjust padding for smaller screens */
  
  @media screen and (max-width: 600px, max-height:700px) {
    max-height: 32rem;
    max-width: 90%; /* Adjust the maximum width for smaller screens */
  }
`;

const FormHeading = styled.h3`
  font-size: 2rem;
  line-height: 3rem;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-top: 1rem; /* Adjust margin for smaller screens */
  font-size: 1rem;
    @media screen and (max-width: 600px) {
      margin-top: 1rem;
      font-size: 1rem;
      }
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
    @media screen and (max-width: 600px) {
      max-width: 100%;
      margin-top: 1rem;
      }
`;

const Button = styled.button`
  margin-top: 2rem; /* Adjust margin for smaller screens */
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 1.2rem; /* Adjust padding for smaller screens */
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
    @media screen and (max-width: 600px) {
      max-width: 100%;
      }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {register} =  useGlobalContext();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register({username: username, email: email, password: password});
  };

  return (
    <div>
      <Background></Background>
      <Form onSubmit={handleSubmit}>
        <FormHeading>Register Here</FormHeading>

        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          value={username}
          onChange={handleUsername}
          placeholder="Username"
        />

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

        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default Register;
