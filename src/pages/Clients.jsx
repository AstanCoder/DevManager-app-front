import React from "react";
import Layout from "../layouts/Layout";
import {
  Center,
  HStack,
  IconButton,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import services from "../services/services";
import ClientForm from "../components/forms/ClientForm";

function Clients({ setSelectedPage }) {
  const {
    data: clients,
    isLoading,
    isSuccess,
    error,
  } = useQuery(["clients"], services.listClients);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Layout
      title={
        <HStack>
          <Text>Clientes</Text>
          <IconButton
            rounded="3xl"
            onClick={onOpen}
            icon={<AddIcon />}
          ></IconButton>
        </HStack>
      }
      setSelectedPage={setSelectedPage}
    >
      <ClientForm isOpen={isOpen} onClose={onClose} />
      <TableContainer>
        <Table variant="unstyled" size="lg">
          <TableCaption>Registro de clientes en el sistema</TableCaption>
          <Thead>
            <Tr>
              <Th>ID del cliente</Th>
              <Th>Nombre del cliente</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Tr>
                <Td>
                  <Spinner />
                </Td>
                <Td>
                  <Spinner />
                </Td>
              </Tr>
            )}
            {clients?.length > 0 ? (
              clients?.map((client) => (
                <Tr key={client?.id}>
                  <Td>{client?.id}</Td>
                  <Td>{client?.nombre}</Td>
                </Tr>
              ))
            ) : (
              <Tr>No hay clientes registrados en el sistema</Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
}

export default Clients;
