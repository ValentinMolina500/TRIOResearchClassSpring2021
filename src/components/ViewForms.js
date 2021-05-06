import React, { useState, useEffect } from 'react';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Heading,
  Box,
  Button,
  Flex,
  Tooltip
} from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Authentication from "../utils/Authentication";
import Firebase from "../utils/Firebase";
import { Status } from '../utils/Globals';

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

const ViewForms = () => {
  const history = useHistory();
	const user = Authentication.getCurrentUser();
	const [forms, setForms] = useState([]);

	useEffect(() => {
		const init = async () => {
			const forms = await Firebase.getForms(user.uid);
			setForms(forms);
		}

		init();
  }, [user.uid]);
  
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

	const renderForms = () => {
		return forms.map((form, i) => {
			return (
				<Tr key={i}>
					<Td>{formatDate(new Date(form.timestamp))}</Td>
          <Td>{formatDate(new Date(form.updatedAt))}</Td>
					<Td>{renderStatus(form.status)}</Td>
					<Td>
            <Button 
              size="sm" 
              leftIcon={<ExternalLinkIcon />} 
              colorScheme="teal"
              onClick={() => history.push(`/forms/${form.key}`)}
            >
              View
            </Button>
          </Td>
				</Tr>
			);
		});
	}

	return (
		<Box bg="#F2F5F9" minH="100vh" py="2rem" >
			<Flex justifyContent="space-between" mx="2rem" mb="2rem" alignItems="center">
      <Heading size="lg">View Forms</Heading>
      <Button onClick={() => history.push('/dashboard')} colorScheme="teal" leftIcon={<ArrowForwardIcon />}>Go Back</Button>
      </Flex>
			
			<Box mx="2rem">
			
			<Table variant="simple"  w="100%" px="2rem" bg="white" boxShadow="sm">
				  <Thead>
				    <Tr>
				      <Th>Date Submitted</Th>
              <Th>Updated At</Th>
				      <Th>Status</Th>
              
				      <Th>Action</Th>
				    </Tr>
				  </Thead>
				  <Tbody>
				   	{renderForms()}
				  </Tbody>
			</Table>
			</Box>
		</Box>
	);
}

export default ViewForms;