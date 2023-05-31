import { CalendarIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Stack,
  StackDivider,
  VStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import services from "../services/services";
import { enqueueSnackbar } from "notistack";
import Alert from "./Alert";
import { useQueryClient } from "react-query";

function ProjectCard({ id, name, client_name, date, description, status }) {
  const [project_id, setProject_id] = useState(null);


  const queryClient = useQueryClient()

  const { isOpen, onOpen, onClose } = useDisclosure();

  let project_status_label;
  let project_status_color;

  switch (status) {
    case "in_development":
      project_status_label = "En Desarollo";
      project_status_color = "blue";
      break;

    case "completed":
      project_status_label = "Finalizado";
      project_status_color = "green";
      break;
    case "canceled":
      project_status_label = "Cancelado";
      project_status_color = "red";
      break;
    case "pending":
      project_status_label = "Pendiente";
      project_status_color = "yellow";
      break;
    default:
      project_status_label = "No hay datos";
      project_status_color = "gray";
      break;
  }

  const handleDeleteAlert = (id) => {
    setProject_id(id);
    onOpen();
  };

  const handleDeleteProject = async () => {
    try {
      return await services
        .deleteProject(project_id)
        .then(() => {
          enqueueSnackbar("Se ha borrado el proyecto con exito", {
            persist: false,
            variant: "success",
          });
          queryClient.invalidateQueries("projects")
        })
        .catch((err) => {
          enqueueSnackbar("Ha ocurrido un error al borrar el proyecto", {
            persist: false,
            variant: "error",
          });
          console.log(err);
        });
    } catch (error) {
      console.log(err);
      enqueueSnackbar("Ha ocurrido un error");
    }
  };

  return (
    <>
      <Card size="lg" maxW="20rem" maxH="30rem" pt="2">
        <Heading m="auto" size="lg">
          {name}
        </Heading>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <HStack alignItems="start">
              <Text color="black" fontWeight="bold">
                Cliente:
              </Text>
              <Text as="p">{client_name}</Text>
            </HStack>
            <HStack alignItems="start">
              <Text color="black" fontWeight="bold">
                Fecha Estimada:{" "}
              </Text>
              <Text as="p">{date}</Text>
            </HStack>
            <VStack alignItems="start">
              <Text color="black" fontWeight="bold">
                Descripción:{" "}
              </Text>
              <Text as="p">{description}</Text>
            </VStack>
            <HStack alignItems="baseline">
              <Text color="black" fontWeight="bold">
                Estado:{" "}
              </Text>
              <Badge variant="solid" colorScheme={project_status_color}>
                {project_status_label}
              </Badge>
            </HStack>
          </Stack>

          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                variant="ghost"
                leftIcon={<CalendarIcon />}
                colorScheme="blue"
              >
                Tareas
              </Button>
              <Button
                leftIcon={<DeleteIcon />}
                variant="ghost"
                colorScheme="red"
                onClick={() => handleDeleteAlert(id)}
              >
                Borrar
              </Button>
            </ButtonGroup>
          </CardFooter>
        </CardBody>
      </Card>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        element_name={"proyecto"}
        trigguer_delete={handleDeleteProject}
      />
    </>
  );
}

export default ProjectCard;
