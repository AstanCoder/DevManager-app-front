import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import services from "../services/services";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    data: teams,
    isLoading,
    error,
    isSuccess,
  } = useQuery(["teams"], services.listTeams, {
    keepPreviousData: true,
  });

  const {
    data: usertypes,
    isLoading: loadingUsertypes,
    error: ErrorUsertypes,
    isSuccess: SuccessUsertypes,
  } = useQuery(["usertypes"], services.listUserTypes);

  const defaultValues = {
    nombre: "",
    usertype: "",
    email: "",
    password: "",
    team: "",
  };

  const { register, handleSubmit } = useForm({ defaultValues: defaultValues });

  const onSubmit = async (values) => {
    const _values = {
      nombre: values.nombre,
      tipo_usuario: Number(values.usertype),
      equipo: Number(values.team),
      email: values.email,
      password: values.password,
    };

    return await services
      .createUser(_values)
      .then(() => {
        enqueueSnackbar("Usuario creado con exito", {
          variant: "success",
          persist: false,
        });
      })
      .catch(() => {
        enqueueSnackbar("Ha ocurrido un error al crear el usuario", {
          variant: "error",
          persist: false,
        });
      });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Crear Usuario
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="nombre" name="nombre" isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input type="text" name="nombre" {...register("nombre")} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="usertype">
                    <FormLabel>Tipo De Usuario</FormLabel>
                    <Select name="usertype" {...register("usertype")}>
                      {usertypes?.data?.results?.map((option) => {
                        return (
                          <option value={option.id} key={option.id}>
                            {option.valor}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" {...register("email")} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="team" isRequired>
                <FormLabel>Equipo</FormLabel>
                <Select name="team" {...register("team")}>
                  {teams?.data?.results?.map((option) => {
                    return (
                      <option value={option.id} key={option.id}>
                        {option.nombre}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Crear
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
