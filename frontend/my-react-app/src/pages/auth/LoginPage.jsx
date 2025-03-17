
import React from 'react'
import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast, Text } from "@chakra-ui/react";
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../../components/skeleton/LoadingSpinner';
//import { Link } from "react-router-dom";

export const LoginPage = () => {
  const toast = useToast();
  const query = useQueryClient();
  const {mutate, isPending: isLoggingIn, isError, error} = useMutation({
    mutationFn: async ({username, password}) => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({username, password})
        });
        const data = await res.json();
        if(!res.ok) {
          toast({
            title: 'Error',
            description: data.error,
            status: 'error',
            isClosable: true
          })
        }
        return data;
      }
      catch(error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      query.invalidateQueries({queryKey: ['authUser']});
    },
  })
  const [account, setAccount ] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate(account);
  }
  return (
    <Container maxW="container.sm">
          <VStack spacing={1}>
          <Heading as={"h1"} size={"lg"} textAlign={"center"} mb={8} bgGradient={'linear(to-r, red.400, orange.400)'} bgClip={'text'}>Login</Heading>
          <Box w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.800')} boxShadow={'2xl'} rounded={'lg'} p={6} textAlign={'center'} alignItems={'center'} mt={15}>
              <VStack spacing={4}>
                <Input placeholder="Username" name='username' value={account.username} onChange={(e) => setAccount({...account, username: e.target.value})}/>
                <Input placeholder="Password" name='password' type="password" value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})}/>
                </VStack>
            </Box>
            {!isLoggingIn ? <Button colorScheme="red" size="lg" mt={4} onClick={handleSubmit}>Login</Button> : <Button colorScheme="red" size="lg" mt={4}><LoadingSpinner /></Button>}
            {isError && 
            toast({
              title:"Error",
              description: error.message,
              duration: 3000,
              isClosable: true
            })}
            </VStack>
          </Container>
  )
}


export default LoginPage