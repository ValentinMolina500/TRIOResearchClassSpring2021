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
} from "@chakra-ui/react";


export default function Login() {
  const history = useHistory();
  const onButtonClick = () => {
    history.push("/SignUp");
  }
  return (
    <Flex width="100vw" height="100vh" align="center" justifyContent="center">
      <Box>
        <Box p={2}>
          <Box textAlign="center">
            <Heading color="red.200">Vaccination Tracking App</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
              <FormControl>
                <FormLabel color="red.600">Email</FormLabel>
                <Input type="email" placeholder="test@login.com" />
              </FormControl>
              <FormControl mt={6}>
                <FormLabel color="red.600">Password</FormLabel>
                <Input type="password" placeholder="*******" />
              </FormControl>
              <Button width="full" mt={4} type="submit" colorScheme="red" variant="solid">
                LogIn
              </Button>
              <Button onClick={onButtonClick} width="full" mt={4} type="submit"color="red.600">
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
