import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from "@chakra-ui/react";
import React, { useState } from 'react';
import { useProductStore } from "../store/product";

const CreatePage = () => {
	//Variable for new products using useState()
	const [ newProduct , setNewProduct ] = useState({
    name: "",
    price : "",
    image : ""
 });
 //Toast for the notifications
 const toast = useToast();
 //Function from the product.js to create product
 const { createProduct } = useProductStore();
 const addProduct = async () => {
	const { success, message } = await createProduct(newProduct);
	if (!success) {
		toast({
			title: "Error",
			description: message,
			status: "error",
			duration: 5000,
			isClosable: true,
		});
	} else {
		toast({
			title: "Success",
			description: message,
			status: "success",
			duration: 5000,
			isClosable: true,
		});
	}
	setNewProduct({name: "", price: "", image: ""});
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
						<Input
							placeholder="Overview"
							name = "overview"
							value = {newProduct.overview}
							onChange = {(e) => setNewProduct({...newProduct, overview: e.target.value})}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>
						<Button bgGradient={"linear(to-r, orange.400, red.500)"} onClick={addProduct} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
  );
};

export default CreatePage