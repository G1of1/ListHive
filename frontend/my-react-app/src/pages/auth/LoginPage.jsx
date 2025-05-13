import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  useToast,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../components/skeleton/LoadingSpinner';
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const toast = useToast();
  const query = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState({ username: "", password: "" });

  const { mutate, isPending: isLoggingIn } = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      return data;
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(account);
  };

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={6}>
        <Heading
          as="h1"
          size="xl"
          textAlign="center"
          bgGradient="linear(to-r, red.400, orange.400)"
          bgClip="text"
        >
          Login to Your Account
        </Heading>

        <Box
          w="full"
          maxW="md"
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow="2xl"
          rounded="lg"
          p={6}
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Enter your username"
                  value={account.username}
                  onChange={(e) => setAccount({ ...account, username: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={account.password}
                    onChange={(e) => setAccount({ ...account, password: e.target.value })}
                  />
                  <InputRightElement h="full">
                    <IconButton
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="orange"
                size="lg"
                w="full"
                rounded="full"
                isLoading={isLoggingIn}
                loadingText="Logging in"
              >
                Login
              </Button>

              {/* Optional register link */}
              { <Text fontSize="sm" color="gray.500">
                Don't have an account? <Link to="/register"><Text as="span" color="red.400" fontWeight="semibold">Register</Text></Link>
              </Text>}
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage;