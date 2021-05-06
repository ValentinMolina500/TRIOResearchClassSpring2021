import React, { useState } from 'react';

import { 
  Box, Heading, Center,
  FormControl, Input,
  FormLabel,
  Stack,
  Image,
  Text,
  HStack,
  Flex,
  Button,
  FormErrorMessage,
  ScaleFade,
  useToast,
  FormHelperText
} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import Authentication from "../utils/Authentication";
import Firebase from "../utils/Firebase";
import Globals, { Status } from "../utils/Globals";

function CreateForm() {
 
  const user = Authentication.getCurrentUser();
  const toast =  useToast();
  const history = useHistory();

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const time = new Date(data.dateOfBirth).getTime();
    const payload = {
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      patientNumber: data.patientNumber.trim(),
      dateOfBirth: time,
      file: data.fileUpload,
      status: Status.NEEDS_REVIEW,
      email: user.email,
      ownerId: user.uid,
    }

    setIsSubmitting(true);
    await Firebase.uploadForm(payload, user.uid);

    /* Disclosure */
    toast({ title: "Successfully submitted form!", status: "success", isClosable: true })
    setIsSubmitting(false);
    history.push("/view-forms");

  }

  const validateFile = (fileList) => {
    const file = fileList[0];

    if (!file) {
      return false;
    }

    console.log(file);

    const fileExtension = file.name.split(".").pop();
    console.log(fileExtension);

    return Globals.ALLOWED_IMG_EXTENSIONS.includes(fileExtension);
  }

  const renderFileExtensions = () => {
    return Globals.ALLOWED_IMG_EXTENSIONS.map((extension) => `.${extension} `);
  }

  return (

    <Center h="100vh" w="100vw"  bg="#F2F5F9">

      <Box w="100%" maxW="35rem" mx="2rem" bg="white" padding="2rem" borderRadius="lg" boxShadow="md">
          <Heading  size="lg">Create Form</Heading>
          <Text color="gray.500" mb="1.5rem">Input information from COVID-19 Vaccination Record Card</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="1.5rem"> 
            <FormControl id="lastName" isRequired  isInvalid={errors.lastName}>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <Input 
                placeholder="Last Name" 
                defaultValue={user.lastName}
                {...register("lastName", { required: true })}
              />
  
            </FormControl>

            <FormControl id="firstName" isRequired isInvalid={errors.firstName}>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <Input 
                placeholder="First Name" 
                defaultValue={user.firstName}
                {...register("firstName",  { required: true })}
              />
            </FormControl>

            <FormControl id="dateOfBirth" isRequired isInvalid={errors.dateOfBirth}>
              <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
              <Input 
                type="date" 
                placeholder="Date of Birth" 
                {...register("dateOfBirth",  { required: true, valueAsDate: true })}
              />
            </FormControl>

            <FormControl id="patientNumber" isRequired isInvalid={errors.patientNumber}>
              <FormLabel htmlFor="patientNumber">Patient Number</FormLabel>
              <Input 
                placeholder="Patient Number" 
                {...register("patientNumber",  { required: true })}
              />
              
            </FormControl>
      
            <FormControl id="fileUpload" isRequired isInvalid={errors.fileUpload}>
              <FormLabel>Upload Vaccination Record Card Image</FormLabel>
              <Input type="file" {...register("fileUpload",  { required: true, validate: validateFile })} />
              { errors.fileUpload && <FormErrorMessage>Invalid file type, please choose another file!</FormErrorMessage>}
              <FormHelperText>Allowed file extensions: {renderFileExtensions()}</FormHelperText>
              
            </FormControl>

            <Button loadingText="Submitting" isLoading={isSubmitting} t="1.5rem" width="100%"  type="submit" colorScheme="teal">Submit</Button>
            </Stack>
          </form>
      </Box>

    </Center>

  );
}

export default CreateForm;