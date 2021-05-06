import {
  Heading,
  Box,
  Center,
  ScaleFade,
  Text,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Image
} from "@chakra-ui/react";
import QrReader from "react-qr-reader";
import { useState } from "react";

import {
  CheckCircleIcon,
  NotAllowedIcon,
  ArrowBackIcon
} from "@chakra-ui/icons";
import Firebase from "../utils/Firebase";
import { useHistory } from "react-router-dom";

function ScanQRCode() {
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState(null);
  const [vaccinated, setVaccinated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleError = () => {};

  const handleScan = async (data) => {
    console.log(data);
    if (data) {
      setResult(data);
      setIsLoading(true);
      
      const userObj = await Firebase.getUserById(data);

      const userData = userObj.val();
      console.log(userData);
      if (userData.vaccinated == false) {
        setVaccinated(false);
      } else {
        /* Grab the form */
        setVaccinated(true);
        const formSnapshot = await Firebase.getFormById(userData.verifiedForm);
        const form = formSnapshot.val();
        setFormData(form);

      }

      setIsLoading(false);
    }
  };

  const onScanAgain = () => {
    setResult(null);
    setFormData(null);
    setVaccinated(false);
  }

  const renderResult = () => {
    if (vaccinated) {
      return (

      <>
      <CheckCircleIcon boxSize="3.75rem" color="green.500" />
      <Text fontSize="1.5rem" fontWeight="semibold" mt="0.75rem">
        This individual is vaccinated!
      </Text>

      <Grid mt="2rem" gridTemplateColumns="1fr 1fr" rowGap="1rem" columnGap="1rem">
        <GridItem gridColumn="1">
          <FormControl id="lastName">
            <FormLabel>Last Name</FormLabel>
            <Input
              type="text"
              variant="unstyled"
              disabled="true"
              value={formData.lastName}
            />
          </FormControl>
        </GridItem>
        <GridItem gridColumn="2">
          <FormControl id="firstName">
            <FormLabel>First Name</FormLabel>
            <Input
              type="text"
              variant="unstyled"
              disabled="true"
              value={formData.firstName}
            />
          </FormControl>
        </GridItem>
        <GridItem gridColumn="1">
          <FormControl id="dob">
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="text"
              variant="unstyled"
              disabled="true"
              value={new Date(formData.dateOfBirth).toDateString()}
            />
          </FormControl>
        </GridItem>
        <GridItem gridColumn="2">
          <FormControl id="dob">
            <FormLabel>Patient Number</FormLabel>
            <Input
              type="text"
              variant="unstyled"
              disabled="true"
              value={formData.patientNumber}
            />
          </FormControl>
        </GridItem>
        <GridItem gridColumnStart="1" gridColumnEnd="3">

        <Image
            _hover={{ cursor: "pointer" }}
            onClick={() => window.open(formData.image)}
            boxShadow="md"
            borderRadius="lg"
            boxSize="15rem"
            w="100%"
            objectFit="cover"
            src={formData.image}
          />
        </GridItem>
      </Grid>
      <Button onClick={onScanAgain} mt="2rem" w="100%">
        Scan Again
      </Button>
      <Button   mt="1rem" w="100%" onClick={() => history.goBack()}>
        Go Back
      </Button>
      </>
      );
    } else {
      return (
        <>
         <NotAllowedIcon boxSize="3.75rem" color="red.500" />
      <Text fontSize="1.5rem" fontWeight="semibold" mt="0.75rem">
        This individual is NOT vaccinated!
      </Text>

      
      <Button onClick={onScanAgain} mt="2rem" w="100%">
        Scan Again
      </Button>
      <Button  mt="1rem" w="100%" onClick={() => history.goBack()}>
        Go Back
      </Button>
        </>
      )
     
    }
  }
  return (
    <Center w="100vw" h="100vh" bg="#F2F5F9">
      {result === null ? (
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", maxWidth: "25rem" }}
        />
      ) : (
        <Box
          textAlign="center"
          maxW="40rem"
          w="100%"
          background="white"
          padding="2rem"
          borderRadius="lg"
          boxShadow="sm"
        >
          {
            isLoading ? <Spinner /> : renderResult()
          }
        </Box>
      )}
    </Center>
  );
}

export default ScanQRCode;
