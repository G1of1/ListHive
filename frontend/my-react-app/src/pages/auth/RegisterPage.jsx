import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast, Text } from "@chakra-ui/react";
import React from 'react'
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const RegisterPage = () => {
  const toast = useToast();
  const query = useQueryClient();
  const { mutate, isPending: isRegistering, isError, error } = useMutation({
    mutationFn: async ({username, fullName, email, password}) => {
        try{
            const res = await fetch('/api/auth/register/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, fullName, email, password})
            });
            const data = await res.json();
            if(!res.ok) {
                toast({
                  title: 'Error',
                  description: data.error,
                  status: 'error',
                  isClosable: true
                })
                return null;
            }
            console.log(data);
            return data;
        }
        catch(error) {
            throw new Error(error.message);
        }
    },
    onSuccess: () => {
        query.invalidateQueries({queryKey: ['authUser']});
    },
  })
  const[ account, setAccount] = useState({
    username: "",
    fullName: "",
    email: "",
    password: ""
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    mutate(account);
    if(isError) {
      toast({
        title: "Error",
        description: error.message,
        status: 'error',
        isClosable: true
      })
    }
    setAccount({username: "", fullName: "", email : "", password: ""})
  }
  
  return (
    <>
    {
    <Container maxW="container.sm">
      <VStack spacing={5}>
      <Heading as={"h1"} size={"lg"} textAlign={"center"} mb={1} bgGradient={'linear(to-r, red.400, orange.400)'} bgClip={'text'}>Register</Heading>
      <Box w={'full'} maxW={'md'} bg={useColorModeValue('white', 'gray.800')} boxShadow={'2xl'} rounded={'md'} p={5} textAlign={'center'} alignItems={'center'} mt={15}>
          <VStack spacing={4}>
            <Input placeholder="Username" name='username' value={account.username} onChange={(e) => setAccount({...account, username: e.target.value})}/>
            <Input placeholder="Full Name" name='fullName' value={account.fullName} onChange={(e) => setAccount({...account, fullName: e.target.value})}/>
            <Input placeholder="Email" name='email' value={account.email} onChange={(e) => setAccount({...account, email: e.target.value})}/>
            <Input placeholder="Password" name='password' type="password" value={account.password} onChange={(e) => setAccount({...account, password: e.target.value})}/>
            </VStack>
        </Box>
        {isRegistering ? <Button isLoading colorScheme="red" size="lg" mt={4} ></Button> : <Button colorScheme="red" size="lg" mt={4} onClick={handleSubmit}>Create Account</Button>}
        </VStack>
      </Container>
} 
      </>
  )
}


export default RegisterPage