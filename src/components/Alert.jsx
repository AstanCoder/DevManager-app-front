import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useRef } from "react";

function Alert({ isOpen, onClose, element_name, trigguer_delete }) {
  const cancelRef = useRef();
  const handleDelete = () => {
    trigguer_delete();
    onClose();
  };

  const handleClose = ()=>{
    onClose()
  }
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Borrar {element_name}
            <AlertDialogCloseButton />
          </AlertDialogHeader>

          <AlertDialogBody>
            Esta acción es irreversible, seguro que deseas borrar este{" "}
            {element_name}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={()=>handleClose()}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete()} ml={3}>
              Borrar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default Alert;
