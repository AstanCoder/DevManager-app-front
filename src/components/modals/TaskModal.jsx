import {
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import { useQuery, useQueryClient } from "react-query";
import services from "../../services/services";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
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
    data: status,
    isLoading: loadingStatus,
    isSuccess: successStatus,
    error: errorStatus,
  } = useQuery(["status"], services.listTaskStatus);

  console.log(status);

  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();

  const queryClient = useQueryClient();

  const handleChangeTaskStatus = async (id, status_id) => {
    return await services.updateTask(id, status_id).then(() => {
      queryClient.invalidateQueries("taskList");
    });
  };

  const handleDeleteTask = async (id) => {
    return await services.deleteTask(id).then(() => {
      queryClient.invalidateQueries("taskList");
    });
  };

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
                  {tasks?.length > 0 ? (
                    tasks?.map((task) => (
                      <Tr key={task?.id}>
                        <Td>{task?.nombre}</Td>
                        <Td>{task?.descripcion}</Td>
                        <Td>{task?.usuario}</Td>
                        <Td>{task?.rol}</Td>
                        <Td>
                          <Menu>
                            <MenuButton>
                              <Badge
                                rounded="3xl"
                                colorScheme={
                                  getTaskBadgeDetails(task?.estado)?.color
                                }
                              >
                                {getTaskBadgeDetails(task?.estado)?.label}
                              </Badge>
                            </MenuButton>
                            <MenuList>
                              {status?.length > 0 &&
                                status?.map((stat) => (
                                  <MenuItem
                                    key={stat.id}
                                    onClick={() =>
                                      handleChangeTaskStatus(task?.id, stat?.id)
                                    }
                                  >
                                    {" "}
                                    <Badge
                                      rounded="3xl"
                                      colorScheme={
                                        getTaskBadgeDetails(stat?.valor)?.color
                                      }
                                    >
                                      {getTaskBadgeDetails(stat?.valor)?.label}
                                    </Badge>
                                  </MenuItem>
                                ))}
                            </MenuList>
                          </Menu>
                        </Td>
                        <Td>
                          <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            rounded="3xl"
                            variant="ghost"
                            onClick={() => handleDeleteTask(task?.id)}
                          ></IconButton>
                        </Td>
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
