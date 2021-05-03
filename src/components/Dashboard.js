import React, { useState } from "react";

import { Box, Flex, Center, Text, Icon, Heading, Button, Badge } from "@chakra-ui/react";

import { PlusSquareIcon, ViewIcon } from "@chakra-ui/icons";
import QRCodeIcon from "../icons/QRCodeIcon";
import { useHistory } from "react-router-dom";
import Authentication from "../utils/Authentication";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function Dashboard() {
  const [loggingOut, setLoggingOut] = useState(false);

  const history = useHistory();
  const user = Authentication.getCurrentUser() || {};

  const DASHBOARD_ITEMS = [
  {
    name: "Create New Form",
    icon: PlusSquareIcon,
    onClick: () => history.push("/create-form")
  },
  {
    name: "View Forms",
    icon: ViewIcon,
    onClick: () => history.push("/view-forms")
  },
  {
    name: "View QR Code",
    icon: QRCodeIcon,
    onClick: () => history.push("/qrcode")
  },
];
  const renderDashboardItems = () => {

    
    return DASHBOARD_ITEMS.map((item, i) => {
      const Icon = item.icon;

      return (
        <Flex
          cursor="pointer"
          w={{ sm: "18rem", md: "18rem", lg: "18rem"}}
          h={{ sm: "10rem", md: "10rem", lg: "18rem"}}
          
          boxShadow="sm"
          ml={{ sm: 0, md: 0, lg: i != 0 ? "2rem" : "0" }}
 
          mb={{ sm: "2rem", md: "2rem", lg: 0 }}
          borderRadius="lg"
          bg="white"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"

          onClick={item.onClick}
          key={i}
        >
          <Box mb="1rem" color="teal.500">
            <Icon boxSize="2rem" />
          </Box>
          <Text fontSize="lg" fontWeight="600">
            {item.name}
          </Text>
        </Flex>
      );
    });
  };

  const onLogoutClick = async () => {
    setLoggingOut(true);
    await Authentication.logout();
    setLoggingOut(false);
    history.push("/login");
  }

  return (
    <Center bg="#F2F5F9" minH="100vh" w="100vw">
      <Box>
        <Flex 
          flexDirection={{ base: "row", sm: "column", md: "column", lg: "row" }} 
          w="100%" 
          bg="white" 
          p="1rem" 
          boxShadow="sm" 
          my="2rem" 
          borderRadius="lg" 
          justifyContent="space-between" 
          alignItems="center"
        >
          <Box>
            <Heading textAlign={{ sm: "center", md: "center", lg: "unset" }} size="lg" as="h1">Welcome back {user.firstName}!</Heading>
            <Flex mt="0.5rem" alignItems="center">
              <Heading size="md" as="h3" fontWeight="300">
                Your vaccination status is 
              </Heading>

              <Badge ml="0.5rem" colorScheme="red">not vaccinated</Badge>
            </Flex>
          </Box>

          <Button 
            mt={{ sm: "1rem", md: "1rem", lg: 0 }} 
            colorScheme="teal" 
            rightIcon={<ArrowForwardIcon />}
            onClick={onLogoutClick}
            isLoading={loggingOut}
          >
            Logout
          </Button>

        </Flex>
        <Flex flexDirection={{ base: "row", sm: "column", md: "column", lg: "row" }} alignItems={{ sm: "center", md: "center", lg: "unset" }}>{renderDashboardItems()}</Flex>
      </Box>
     
    </Center>
  );
}

export default Dashboard;
