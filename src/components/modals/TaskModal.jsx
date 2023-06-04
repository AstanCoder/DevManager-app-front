import {
  Badge,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import services from "../../services/services";
import { AddIcon } from "@chakra-ui/icons";
import TaskForm from "../forms/TaskForm";
import { getTaskBadgeDetails } from "../../utils/getTaskBadgeDetails";

function TaskModal({ isOpen, onClose, id }) {
  const {
    data: tasks,
    isLoading,
    isSuccess,
    error,
  } = useQuery(["taskList", id], services.listTask);

  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();



  

  


  return (
    <>
      <TaskForm project_id={id} isOpen={isOpenForm} onClose={onCloseForm} />
      <Modal isOpen={isOpen} onClose={onClose} size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Tareas{" "}
            <IconButton
              rounded="3xl"
              variant="ghost"
              icon={<AddIcon />}
              onClick={() => onOpenForm()}
            ></IconButton>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer>
              <Table variant="unstyled" size="lg">
                <Thead>
                  <Tr>
                    <Th>Nombre</Th>
                    <Th>Descripción</Th>
                    <Th>Usuario asignado</Th>
                    <Th>Rol del usuario</Th>
                    <Th>Estado</Th>
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
                  {tasks?.length > 0 ? (
                    tasks?.map((task) => (
                      <Tr key={task?.id}>
                        <Td>{task?.nombre}</Td>
                        <Td>{task?.descripcion}</Td>
                        <Td>{task?.usuario}</Td>
                        <Td>{task?.rol}</Td>
                        <Td><Badge rounded="3xl" colorScheme={getTaskBadgeDetails(task?.estado)?.color}>{getTaskBadgeDetails(task?.estado)?.label}</Badge></Td>
                      </Tr>
                    ))
                  ) : (
                    <Tr>No hay tareas registradas para este proyecto</Tr>
                  )}
                </Tbody>
                <TableCaption mb={4}>
                  Registro de tareas del proyecto
                </TableCaption>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TaskModal;
