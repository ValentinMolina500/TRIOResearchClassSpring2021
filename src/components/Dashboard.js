import React from 'react';

import {
    Box,
    Flex,
    Center,
    Text,
    Icon
} from "@chakra-ui/react";

import { PlusSquareIcon, ViewIcon } from '@chakra-ui/icons';
import QRCodeIcon from "../icons/QRCodeIcon";

const DASHBOARD_ITEMS = [
  {
    name: "Create New Form",
    icon: PlusSquareIcon 

  },
  {
    name: "View Forms",
    icon: ViewIcon
  },
  {
    name: "View QR Code",
    icon: QRCodeIcon

  }
];

function Dashboard() {

    const renderDashboardItems = () => {
      return DASHBOARD_ITEMS.map((item, i) => {
        const Icon = item.icon;

        return (
          <Flex
            cursor="pointer" 
            w="18rem" 
            h="18rem" 
            boxShadow="xl"
            ml={i != 0 ? "2rem" : "0"}
            borderRadius="lg"
            bg="white"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box mb="1rem" color="teal.500">
              <Icon  boxSize="2rem" />
            </Box>
            <Text fontSize="lg" fontWeight="600">{item.name}</Text>
          </Flex>
        );
      });
    }

    return (
      <Center bg="#F2F5F9" h="100vh" w="100vw">
        <Flex>
          {renderDashboardItems()}
        </Flex>
      </Center>
    );
}

export default Dashboard;
