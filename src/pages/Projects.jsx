import React, { useState } from "react";
import Layout from "../layouts/Layout";
import { useQuery } from "react-query";
import services from "../services/services";
import ProjectCard from "../components/ProjectCard";
import { formatDate } from "../utils/formatDate";
import {
  Button,
  Center,
  HStack,
  Heading,
  IconButton,
  SimpleGrid,
  Skeleton,
  SlideFade,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import ProjectForm from "../components/forms/ProjectForm";
import TaskModal from "../components/modals/TaskModal";
import { enqueueSnackbar } from "notistack";

function Projects({ setSelectedPage }) {
  const {
    data: projects,
    isLoading,
    isSuccess,
    error,
  } = useQuery(["projects"], services.listProjects);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ProjectForm isOpen={isOpen} onClose={onClose} />
      <Layout
        setSelectedPage={setSelectedPage}
        title={
          <HStack>
            <Text>Proyectos</Text>
            <IconButton
              onClick={onOpen}
              rounded="3xl"
              icon={<AddIcon />}
            ></IconButton>
          </HStack>
        }
      >
        <Center>
          <SimpleGrid columns={{ lg: 3, base: 1, md: 2 }} spacing={2}>
            {error && <Text>Ha Ocurrido un error al listar los proyectos</Text>}
            {isLoading ? (
              <Stack>
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
              </Stack>
            ) : (
              projects?.map((project) => (
                <SlideFade key={project?.id} in={isSuccess} offsetY="20px">
                  <ProjectCard
                    key={project?.id}
                    id={project?.id}
                    client_name={project?.cliente}
                    date={formatDate(project?.fecha)}
                    name={project?.nombre}
                    status={project?.estado}
                    description={project?.descripcion}
                  />
                </SlideFade>
              ))
            )}
          </SimpleGrid>
        </Center>
      </Layout>
    </>
  );
}

export default Projects;
