import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import services from "../../services/services";
import { enqueueSnackbar } from "notistack";
import { useQuery, useQueryClient } from "react-query";

function TaskForm({ isOpen, onClose, project_id }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      usuario: "",
    },
  });

  const {
    data: users,
    isSucess,
    isLoading,
    error,
  } = useQuery(["users"], services.listUser);

  const queryClient  = useQueryClient()

  const onSubmit = async (values) => {
    await services
      .createTask(project_id, values)
      .then((data) => {
        if (data.status !== 200) {
          enqueueSnackbar("Ha ocurrio un error al registrar la tarea", {
            persist: false,
            variant: "error",
          });
        } else {
            queryClient.invalidateQueries("taskList")
          enqueueSnackbar("Se ha registrado la tarea con exito", {
            persist: false,
            variant: "success",
          });
          onClose();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Ha ocurrio un error al registrar la tarea", {
          persist: false,
          variant: "error",
        });
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar nueva tarea</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={2} isRequired>
              <FormLabel>Nombre de la tarea</FormLabel>
              <Input {...register("nombre")} />
            </FormControl>
            <FormControl mb={2} isRequired>
              <FormLabel>Descripción</FormLabel>
              <Textarea {...register("descripcion")} />
            </FormControl>
            <FormControl mb={8} isRequired>
              <FormLabel>Desarrollador</FormLabel>
              <Select placeholder="Seleccione uno" {...register("usuario")}>
                
                {users?.length > 0 ? (
                  users?.map((user) => (
                    <option key={user?.id} value={user?.id}>{user?.nombre}</option>
                  ))
                ) : (
                  <option>No hay usuarios registrados en el sistema</option>
                )}
              </Select>
            </FormControl>

            <FormControl mb={2}>
              <Button colorScheme="blue" mr={3} type="submit">
                Enviar
              </Button>
              <Button
                colorScheme="red"
                variant="ghost"
                mr={3}
                onClick={onClose}
              >
                Cancelar
              </Button>
            </FormControl>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TaskForm;
