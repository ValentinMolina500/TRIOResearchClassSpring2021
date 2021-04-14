import React from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

function ViewForms(){
  return(
    <Table variant="simple">
  <TableCaption>Vaccination Records
  </TableCaption>
  <Thead>
    <Tr>
      <Th>LAST NAME</Th>
      <Th>FIRST NAME</Th>
      <Th isNumeric>DATE OF BIRTH</Th>
      <Th isNumeric>VACCINATED DATE</Th>
      <Th>DOSE</Th>
    </Tr>
  </Thead>
  <Tbody>
    <Tr>
      <Td>Abcde</Td>
      <Td>Fghi</Td>
      <Td isNumeric>10/20/1980</Td>
      <Td isNumeric>04/04/2021</Td>
      <Td>FIRST</Td>
      
    </Tr>
  </Tbody>
  <Tfoot>
   <Tr>
      <Th>LAST NAME</Th>
      <Th>FIRST NAME</Th>
      <Th isNumeric>DATE OF BIRTH</Th>
      <Th isNumeric>VACCINATED DATE</Th>
      <Th>DOSE</Th>
    </Tr>
  </Tfoot>
</Table>
    
  );
}

export default ViewForms;