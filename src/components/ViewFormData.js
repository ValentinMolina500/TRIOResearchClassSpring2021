import { Box, Center, Spinner, ScaleFade, Heading, Stack, Image, Button } from "@chakra-ui/react";

import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import Firebase from "../utils/Firebase";

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
          
          <Heading as="h3" size="lg" fontWeight="semibold">
            User Info
          </Heading>

          <Heading as="h3" size="lg" fontWeight="semibold">
            Image
          </Heading>
          
          <Image boxShadow="md" boxSize="20rem" objectFit="cover" src={formData.image} />
          
          <Button colorScheme="teal" onClick={() => history.goBack()}>Go Back</Button>
        </Box>
      )}
    </Center>
  );
};

export default ViewFormData;
