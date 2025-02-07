import { Container, Text, VStack, SimpleGrid} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import React from 'react'
import { useProductStore } from '../store/product';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';


const HomePage = () => {
  const { getProducts, products } = useProductStore();
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Container maxW="container.xl" py={12} >
      <VStack spacing={8}>
      <Text fontSize={30} fontWeight={"bold"} bgGradient={"linear(to-r, orange.400, red.400)"} bgClip={"text"} textAlign={"center"}>Products✨</Text>
      <SimpleGrid 
      column={{
        base: 3,
        md: 2,
        lg: 1, }}
      spacing ={10}
      w = {"full"}>
        {products.map((product) => (<ProductCard key={product._id} product={product} />))}
      </SimpleGrid>
      {products.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
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