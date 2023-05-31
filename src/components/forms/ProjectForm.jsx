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
import { useQuery, useQueryClient } from "react-query";
import services from "../../services/services";
import { enqueueSnackbar } from "notistack";

function ProjectForm({ isOpen, onClose }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      fecha_final: "",
      cliente: "",
    },
  });

  const queryClient = useQueryClient();

  const {
    data: clients,
    isLoading,
    isSuccess,
    error,
  } = useQuery(["clients"], services.listClients);

  const onSubmit = async (values) => {
    await services
      .createProject(values)
      .then((data) => {
        if (data.status !== 200) {
          enqueueSnackbar("Ha ocurrio un error al registrar el proyecto", {
            persist: false,
            variant: "error",
          });
        } else {
          enqueueSnackbar("Se ha registrado el proyecto con exito", {
            persist: false,
            variant: "success",
          });
          queryClient.invalidateQueries("projects")
          onClose();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Ha ocurrio un error al registrar el proyecto", {
          persist: false,
          variant: "error",
        });
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar nuevo proyecto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={2} isRequired>
              <FormLabel>Nombre del Proyecto</FormLabel>
              <Input {...register("nombre")} />
            </FormControl>
            <FormControl mb={2} isRequired>
              <FormLabel>Seleccione un Cliente</FormLabel>
              <Select placeholder="Seleccione uno" {...register("cliente")}>
                {isLoading && (
                  <option>
                    <Spinner />
                  </option>
                )}

                {clients?.length > 0 ? (
                  clients?.map((client) => (
                    <option value={client.id}>{client.nombre}</option>
                  ))
                ) : (
                  <option>No hay clientes registrados en el sistema</option>
                )}
              </Select>
            </FormControl>
            <FormControl mb={2} isRequired>
              <FormLabel>Descripción del proyecto</FormLabel>
              <Textarea {...register("descripcion")}></Textarea>
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Fecha de finalización estimada</FormLabel>
              <Input type="datetime-local" {...register("fecha_final")} />
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

export default ProjectForm;
