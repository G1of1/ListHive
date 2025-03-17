import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast, Textarea } from "@chakra-ui/react";
import React, { useState } from 'react';
import useCreateProduct from "../hooks/useCreateProduct";
import LoadingSpinner from '../components/skeleton/LoadingSpinner'
import Product from "../../../../backend/models/product";
const CreatePage = () => {
	//Variable for new products using useState()
	const [ newProduct , setNewProduct ] = useState({
    name: "",
    price : "",
    image : "",
	overview: ""
 });
 
 const {createProduct, isCreating } = useCreateProduct();
 const addProduct = async () => {
	const data = createProduct({product: newProduct});
	 if(!data.error) {
	setNewProduct({name: "", price: "", image: "", overview: ""});
	}
 };

  return (
    <Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Product Name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Textarea
							placeholder="Overview(be sure to include contact information)"
							name = "overview"
							value = {newProduct.overview}
							onChange = {(e) => setNewProduct({...newProduct, overview: e.target.value})}
							size='5xl'
							rounded='md'
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>
						<Button bgGradient={"linear(to-r, orange.400, red.500)"} onClick={(e) => {e.preventDefault(); addProduct()}} w='full'>
							{isCreating ? <LoadingSpinner /> : "Add Product" }
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
  );
};

export default CreatePage