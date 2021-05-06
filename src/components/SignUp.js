/*import React from "react";*/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Input,
  Box,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  AlertTitle,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Authentication from "../utils/Authentication";

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { register, handleSubmit } = useForm();

  const history = useHistory();

  const onButtonClick = () => {
    history.push("/login");
  };

  const onSubmit = async (data) => {
    const userInfo = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
    };

    try {
      setIsSubmitting(true);
      await Authentication.signUp(data.email, data.password, userInfo);
      history.push("/dashboard");
    } catch (e) {
      /* Handle errors */
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex width="100vw" height="100vh" align="center" justifyContent="center">
      <Box p={2}>
        <Box textAlign="center">
          <Heading color="teal.200">Vaccination Tracking Sign Up Page</Heading>
        </Box>
        <Box my={4} textAlign="left">
          {hasError && (
            <Alert mb="1rem" status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Error creating account!</AlertTitle>
              <AlertDescription>Email already in use.</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="1.5rem">
              <FormControl id="firstName" isRequired>
                <FormLabel htmlFor="firstName" color="teal.600">
                  First Name
                </FormLabel>
                <Input
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                />
              </FormControl>

              <FormControl id="lastName" isRequired>
                <FormLabel htmlFor="lastName" color="teal.600">
                  Last Name
                </FormLabel>
                <Input
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel htmlFor="email" color="teal.600">
                  Email
                </FormLabel>
                <Input
                  placeholder="email@signup.com"
                  {...register("email", { required: true })}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel htmlFor="password" color="teal.600">
                  Password
                </FormLabel>
                <Input
                  type="password"
                  placeholder="*******"
                  {...register("password", { required: true })}
                />
              </FormControl>

              <Button
                width="100%"
                mt={4}
                isLoading={isSubmitting}
                type="submit"
                colorScheme="teal"
                variant="solid"
              >
                Submit
              </Button>
            </Stack>
          </form>
          <Button
            onClick={onButtonClick}
            width="full"
            disabled={isSubmitting}
            mt={4}
            type="submit"
            color="teal.600"
          >
            Back to Login
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default SignUp;
