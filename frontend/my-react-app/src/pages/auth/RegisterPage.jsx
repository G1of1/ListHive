import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
  useToast,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export const RegisterPage = () => {
  const toast = useToast();
  const query = useQueryClient();

  const { mutate, isPending: isRegistering } = useMutation({
    mutationFn: async ({ username, fullName, email, password }) => {
      const res = await fetch("/api/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          isClosable: true,
        });
        return null;
      }
      toast({
        title: "Account Created",
        description: "Welcome to ListHive!",
        status: "success",
        isClosable: true,
      });
      return data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const [account, setAccount] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(account);
    setAccount({ username: "", fullName: "", email: "", password: "" });
  };

  return (
    <Container maxW="lg" py={12}>
      <Box
        rounded="2xl"
        boxShadow="xl"
        p={10}
        bg={useColorModeValue("white", "gray.800")}
      >
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, orange.400, red.500)"
              bgClip="text"
            >
              Join ListHive 🐝
            </Heading>
            <Text fontSize="md" color="gray.500" mt={2}>
              Create your free account and start listing today.
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="e.g. johndoe"
                  value={account.username}
                  onChange={(e) =>
                    setAccount({ ...account, username: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  placeholder="John Doe"
                  value={account.fullName}
                  onChange={(e) =>
                    setAccount({ ...account, fullName: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={account.email}
                  onChange={(e) =>
                    setAccount({ ...account, email: e.target.value })
                  }
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={account.password}
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                isLoading={isRegistering}
                colorScheme="orange"
                size="lg"
                width="full"
                rounded="full"
                mt={4}
              >
                Create Account
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default RegisterPage;