import { 
  Box, 
  Center, 
  Spinner, 
  ScaleFade, 
  Heading, 
  Stack, 
  Image, 
  Button, 
  Grid, 
  GridItem, 
  FormControl,
  FormLabel, 
  Input,
  FormHelperText,
  Badge
} from "@chakra-ui/react";

import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import Firebase from "../utils/Firebase";
import { Status } from "../utils/Globals";

/**
 * Makes a date.
 * @param {Date} date date to be formatted
 */
const formatDate = (date) => {
	var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var ampm = hours >= 12 ? 'pm' : 'am';
	  hours = hours % 12;
	  hours = hours ? hours : 12; // the hour '0' should be '12'
	  minutes = minutes < 10 ? '0'+minutes : minutes;
	  var strTime = hours + ':' + minutes + ' ' + ampm;


	return `${date.toDateString()} ${strTime}`
}

const ViewFormData = () => {
  const [formData, setFormData] = useState({});
  const { formId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      const result = await Firebase.getFormById(formId);
      console.log(result.val())
      setFormData(result.val());
      setIsLoading(false);
    };

    init();
  });

  const renderStatus = (status) => {
    switch (status) {
      case Status.NEEDS_REVIEW:
        return <Badge colorScheme="yellow">Needs Review</Badge>
        
      case Status.REJECT:
        return <Badge colorScheme="red">Rejected</Badge>

      case Status.VALID:
        return <Badge colorScheme="green">Verified</Badge>
      
      default: 
        return <Badge>Unknown</Badge>
    }
  }
  
  return (
    <Center bg="#F2F5F9" w="100vw" h="100vh">
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          color="teal.500"
          emptyColor="gray.200"
          size="xl"
        />
      ) : (
      

        
        <Box
          w="100%"
          maxW="50rem"
          bg="white"
          p="2rem"
          mx="2rem"
          borderRadius="lg"
        >
          
          <Heading as="h2" fontSize="1.5rem" fontWeight="semibold" mb="1rem">
            User Info
          </Heading>

          <Grid gridTemplateColumns="1fr 1fr" rowGap="1rem" columnGap="1rem">
            <GridItem gridColumn="1">
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input type="text" variant="unstyled" disabled="true" value={formData.lastName} />
              </FormControl>
            </GridItem>
            <GridItem gridColumn="2">
              <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input type="text" variant="unstyled" disabled="true" value={formData.firstName} />
              </FormControl>
            </GridItem>
            <GridItem gridColumn="1">
              <FormControl id="dob">
                <FormLabel>Date of Birth</FormLabel>
                <Input type="text" variant="unstyled" disabled="true"    value={new Date(formData.dateOfBirth).toDateString()} />
              </FormControl>
            </GridItem>
            <GridItem gridColumn="2">
              <FormControl id="dob">
                <FormLabel>Patient Number</FormLabel>
                <Input type="text" variant="unstyled" disabled="true"    value={formData.patientNumber} />
              </FormControl>
            </GridItem>
            <GridItem gridColumn="1">
              <FormControl id="timestamp">
                <FormLabel>Timestamp</FormLabel>
                <Input type="text" variant="unstyled" disabled="true" value={formatDate(new Date(formData.timestamp))} />
              </FormControl>
            </GridItem>
            <GridItem gridColumn="2">
              <FormControl id="formId">
                <FormLabel>Status</FormLabel>
                {renderStatus(formData.status)}
              </FormControl>
            </GridItem>
          </Grid>

          <Heading my="1rem" as="h2"  fontSize="1.5rem" fontWeight="semibold">
            Image
          </Heading>
          
          <Image  _hover={{ cursor: "pointer" }} onClick={() => window.open(formData.image)} boxShadow="md" borderRadius="lg" boxSize="15rem" w="100%" objectFit="cover" src={formData.image} />
          
          <Button mt="2rem" colorScheme="teal" onClick={() => history.goBack()}>Go Back</Button>
        </Box>
      
      )}
    </Center>
    
  );
};

export default ViewFormData;
