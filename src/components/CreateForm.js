import React from 'react';

import { 
  Box, Heading, Center,
  FormControl, Input,
  FormLabel,
  Stack,
  Image,
  Text,
  HStack,
  Flex,
  Button
} from '@chakra-ui/react';


import { ArrowUpIcon } from '@chakra-ui/icons'

function CreateForm() {

  return (
    <Center h="100vh" w="100vw">
      <Box w="25rem">
        <Stack spacing="1.5rem"> 

          <FormControl id="lastName" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input placeholder="Last Name" />
          </FormControl>

          <FormControl id="firstName" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input placeholder="First Name" />
          </FormControl>

          <FormControl id="dob" isRequired>
            <FormLabel>Date of Birth</FormLabel>
            <Input type="date" placeholder="Date of Birth" />
          </FormControl>

          <FormControl id="patientNumber" isRequired>
            <FormLabel>Patient Number</FormLabel>
            <Input placeholder="Patient Number" />
          </FormControl>
    
          

          <Center _hover={{ cursor: "pointer" }} borderWidth="1px" borderColor="gray.300" borderRadius="1rem" padding="2rem">
            <Flex flexDirection="column" alignItems="center">
              <ArrowUpIcon boxSize="2rem" color="teal.500" />
              <Text>Upload Vaccination Record Card Image</Text>
            </Flex>
           
          </Center>
        </Stack>

        <Button mt="1.5rem" width="100%" colorScheme="teal">Submit</Button>
      </Box>
      
    </Center>
  );
}

export default CreateForm;