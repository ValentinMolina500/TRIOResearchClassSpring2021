/*import React from "react";*/
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import {
	Input,
	Box,
    Heading,
    Flex,
    FormControl,
    FormLabel,
    Button,
    ButtonGroup
} from "@chakra-ui/react";


function SignUp() {
    const[name, setName]=useState("");
    const[last,setLast]=useState("");
    const[email,setEmail]=useState("");

    const history = useHistory();
  const onButtonClick = () => {
    history.push("/Login");
  }

	return (
        <Flex width="100vw" height="100vh" align="center" justifyContent="center">
          <Box p={2}>
          <Box textAlign="center">
            <Heading color="teal.200">Vaccination Tracking Sign Up Page</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form>
                  <FormControl>
                  <FormLabel color="teal.600">First Name</FormLabel>
                  <Input value={name} onChange={e=> setName(e.target.value)} placeholder="First Name"/>
                  </FormControl>
                  <FormControl>
                  <FormLabel color="teal.600">Last Name</FormLabel>
                  <Input value={last} onChange={e=> setLast(e.target.value)} placeholder="Last Name"/>
                  </FormControl>
                  <FormControl>
                  <FormLabel color="teal.600">Email</FormLabel>
                  <Input value={email} onChange={e=> setEmail(e.target.value)} placeholder="email@signup.com"/>
                  </FormControl>
                  <Button width="full" mt={4} type="submit" colorScheme="teal" variant="solid">
                Submit
                 </Button>
              <Button onClick={onButtonClick} width="full" mt={4} type="submit" color="teal.600">
              Back to Login
              </Button> 
          </form>
          </Box>
          </Box>
        </Flex>
	);
}

export default SignUp;