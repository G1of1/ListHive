import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Container, Text, VStack, SimpleGrid, useToast, Flex} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/skeleton/LoadingSpinner';


const ProductsPage = () => {
  const { data: authUser } = useQuery({queryKey: ['authUser']});
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['userProducts', authUser?._id],
    enabled: !!authUser?._id,
    queryFn: async () => {
      const res = await fetch(`/api/products/${authUser._id}`);
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error);
      }
      return data;
    },
    retry: false,
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        isClosable: true
      });
    }
  });
  console.log(products);
    return (
      <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, orange.400, red.400)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Your Listings✨
        </Text>
    
        {isLoading ? (
          <Flex w="full" justify="center" align="center" minH="200px">
            <LoadingSpinner />
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products?.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </SimpleGrid>
        )}
    
        {!isLoading && products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign={"center"}
            fontWeight="bold"
            color="gray.500"
          >
            No Products found...
            <Link to={"/create"}>
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a Listing😎
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default ProductsPage