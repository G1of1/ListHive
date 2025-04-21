import { Container, Text, VStack, SimpleGrid, useToast, Box, Flex, Input, Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/skeleton/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';


const HomePage = () => {
//TODO: Completely Finish searchbar functionality
  const toast = useToast();
  const{ data: products, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try{
        const res = await fetch('/api/products/all');
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
        throw new Error(error.message)
      }
    }

  })
  const [text, setText] = useState('');

  const filteredProducts = products?.filter(product => product.name.toLowerCase().includes(text.toLowerCase()))
  
  return (
    <Container maxW="container.xl" py={12} >
      <VStack spacing={8}>
      <Text fontSize={30} fontWeight={"bold"} bgGradient={"linear(to-r, orange.400, red.400)"} bgClip={"text"} textAlign={"center"}>Listings✨</Text>
      <Box w={"50%"} rounded={'lg'} shadow={'md'} p={6} align={'center'} alignItems={'center'} justifyContent={'center'}>
        <Input w={"65%"} placeholder='Search 🔍' value={text} onChange={(e)=> {setText(e.target.value)}}/>
      </Box>
      <SimpleGrid 
      columns={{
        base: 1,
        md: 2,
        lg: 3, }}
      spacing ={10}
      w = {"full"}>
      {!isLoading ? filteredProducts.map((product) => (<ProductCard key={product._id} product={product} />)): <Flex justifyContent='center' alignItems='center'><Box w='100vw' h='100vh' flex=''><LoadingSpinner /></Box></Flex>}
      </SimpleGrid>
      {filteredProducts?.length === 0 && 
      (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Product😎
							</Text>
						</Link>
      </Text>)}
      </VStack>
      </Container>
  )
}

export default HomePage