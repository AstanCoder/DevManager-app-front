import React, { useState } from "react";
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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useQuery, useQueryClient } from "react-query";
import services from "../services/services";
import UsersForm from "../components/forms/UsersForm";
import { enqueueSnackbar } from "notistack";
import Alert from "../components/Alert";

function Users({ setSelectedPage }) {
  const [user_id, setUser_id] = useState(null);

  const queryClient = useQueryClient()

  const {
    data: users,
    isLoading,
    isSuccess,
    error,
  } = useQuery(["users"], services.listUser);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAlertOpen,
    onOpen: openAlert,
    onClose: closeAlert,
  } = useDisclosure();

  const handleDeleteAlert = (id) => {
    setUser_id(id);
    openAlert();
  };

  const handleDeleteUser = async () => {
    await services.deleteUser(user_id).then(() => {
      queryClient.invalidateQueries("users")
      return enqueueSnackbar("Se ha borrado el elemento con exito", {
        persist: false,
        variant: "success",
      });
    });
  };

  return (
    <Layout
      title={
        <HStack>
          <Text>Usuarios</Text>
          <IconButton
            rounded="3xl"
            onClick={onOpen}
            icon={<AddIcon />}
          ></IconButton>
        </HStack>
      }
      setSelectedPage={setSelectedPage}
    >
      <UsersForm isOpen={isOpen} onClose={onClose} />
      <TableContainer>
        <Table variant="unstyled" size="lg">
          <TableCaption>Registro de usuarios en el sistema</TableCaption>
          <Thead>
            <Tr>
              <Th>Nombre</Th>
              <Th>Equipo</Th>
              <Th>Rol</Th>
              <Th>Correo</Th>
              <Th>Acciones</Th>
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
                <Td>
                  <Spinner />
                </Td>
                <Td>
                  <Spinner />
                </Td>
                <Td>
                  <Spinner />
                </Td>
              </Tr>
            )}
            {users?.length > 0 ? (
              users?.map((user) => (
                <Tr key={user?.id}>
                  <Td>{user?.nombre}</Td>
                  <Td>{user?.equipo}</Td>
                  <Td>{user?.rol}</Td>
                  <Td>{user?.correo}</Td>
                  <Td>
                    <IconButton
                      onClick={() => handleDeleteAlert(user?.id)}
                      icon={<DeleteIcon />}
                    ></IconButton>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>No hay usuarios registrados en el sistema</Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      <Alert
        isOpen={isAlertOpen}
        onClose={closeAlert}
        element_name={"usuario"}
        trigguer_delete={handleDeleteUser}
      />
    </Layout>
  );
}

export default Users;
