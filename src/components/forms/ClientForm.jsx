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
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import services from "../../services/services";
import { enqueueSnackbar } from "notistack";

function ClientForm({ isOpen, onClose }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      nombre: "",
    },
  });

  const onSubmit = async (values) => {
    await services
      .createClient(values)
      .then((data) => {
        if (data.status !== 200) {
          enqueueSnackbar("Ha ocurrio un error al registrar el cliente", {
            persist: false,
            variant: "error",
          });
        } else {
          enqueueSnackbar("Se ha registrado el cliente con exito", {
            persist: false,
            variant: "success",
          });
          onClose();
        }
      })
      .catch((err) => {
        enqueueSnackbar("Ha ocurrio un error al registrar el cliente", {
          persist: false,
          variant: "error",
        });
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registrar nuevo cliente</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl mb={2} isRequired>
              <FormLabel>Nombre del Cliente</FormLabel>
              <Input {...register("nombre")} />
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

export default ClientForm;
