import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

const Background = styled.div`
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;

const Form = styled.form`
  height: 620px;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
`;

const FormHeading = styled.h3`
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
`;

const Input = styled.input`
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
`;

const Button = styled.button`
  margin-top: 50px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
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
