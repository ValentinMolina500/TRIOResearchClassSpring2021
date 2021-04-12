import React from 'react';
import {
    Grid,
    Flex,
    Box,
    HStack,
    Text,
    Center
} from '@chakra-ui/react';

function Dashboard() {
    return (
        <Grid h="100vh" w="100vw" bg="red" placeContent="center" bg="#F5F7FA">
            <HStack w="100%" spacing="2rem">
                <Center w="18rem" h="18rem" bg="white" boxShadow="xl" borderRadius="lg">
                    <Text fontSize="lg" fontWeight="semibold">Create New Form</Text>
                </Center>
                <Center w="18rem" h="18rem" bg="white" boxShadow="xl" borderRadius="lg">
                    <Text fontSize="lg" fontWeight="semibold">View Forms</Text>
                </Center>
                <Center w="18rem" h="18rem" bg="white" boxShadow="xl" borderRadius="lg">
                    <Text fontSize="lg" fontWeight="semibold">QR Code</Text>
                </Center>
            </HStack>
        </Grid>
    );
}

export default Dashboard;
