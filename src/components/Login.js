/*import React from "react";*/
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Authentication from "../utils/Authentication";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const history = useHistory();
  const [loginError, setLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onLogin = async (data) => {
   

<<<<<<< HEAD
    return (
        <div className="Login">
            <h1>COVID-19 Vaccination Tracking Application</h1>
            <div className ="Title"> 
                <h2>Login</h2>
            </div>
            <div>
                <input {...inputProps}
                placeholder="Username" />
            </div>
            <div>
                <input {...inputProps}
                placeholder="Password" />
            </div>
            <button onClick={Login}>Login</button>;
        </div>
    );}
    
export default Login;
=======
    try {
      setIsLoading(true);
      await Authentication.login(data.email, data.password);
      history.push("/dashboard");
    } catch (e) {
      console.error(e);
      setLoginError(true);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Flex width="100vw" height="100vh" align="center" justifyContent="center">
      <Box>
        <Box p={2}>
          <Box textAlign="center">
            <Heading color="red.200">Vaccination Tracking App</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit(onLogin)}>
              <FormControl id="email" isRequired>
                <FormLabel color="red.600">Email</FormLabel>
                <Input type="email" placeholder="test@login.com" {...register("email", { required: true })}/>
              </FormControl>
              <FormControl mt={6} id="password" isRequired>
                <FormLabel color="red.600">Password</FormLabel>
                <Input type="password" placeholder="*******" {...register("password", { required: true })}/>
              </FormControl>
              {loginError && <Text color="red.500">Invalid credentials</Text>}
              <Button width="100%" isLoading={isLoading} mt={4} type="submit" colorScheme="red" variant="solid">
                LogIn
              </Button>
              <Button disabled={isLoading} onClick={() => history.push("/SignUp")} width="full" mt={4} type="submit"color="red.600">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
>>>>>>> fbcfdfa04e19e4246b95325448b9472a8c5fa863
