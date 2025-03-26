import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast, Textarea } from "@chakra-ui/react";
import React, { useRef, useState } from 'react';
import useCreateProduct from "../hooks/useCreateProduct";
import LoadingSpinner from '../components/skeleton/LoadingSpinner'
import Product from "../../../../backend/models/product";
const CreatePage = () => {
	//Variable for new products using useState()
	const [ newProduct , setNewProduct ] = useState({
    name: "",
    price : "",
    image : "",
	overview: "",
	email: "",
	number: ""
 });
 const [img, setImg] = useState(null);
 const imgRef = useRef(null);
 const handleImageSubmit = (e) => {
	 const file = e.target.files[0];
	 if(file) {
		const reader = new FileReader();
		reader.onload = () => {
			setImg(reader.result);
		}
		reader.readAsDataURL(file);
		setNewProduct({...newProduct, image: img});
		console.log(newProduct.image);
	 }

 }
 const {createProduct, isCreating } = useCreateProduct();
 const addProduct = async () => {
	console.log(newProduct);
	const data = createProduct({product: newProduct});
	 if(!data.error) {
	setNewProduct({name: "", price: "", image: "", overview: "", email: "", number: ""});
	}
 };

  return (
    <Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"} mb={4}>
					<VStack spacing={4}>
						<Heading as={"h3"} size={'md'} textAlign={"center"} mb={2}>Product Info</Heading>
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
							placeholder="   Overview(be sure to include contact information)"
							name = "overview"
							value = {newProduct.overview}
							onChange = {(e) => setNewProduct({...newProduct, overview: e.target.value})}
							size='5xl'
							rounded='md'
						/>
						{/*<Input
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>*/}
						Insert Images:
						<input type='file' name='image' accept="image/*" ref={imgRef} onChange={handleImageSubmit}  />
						<Heading as={'h3'} size={'md'} textAlign={'center'} mb={2}>Contact Info</Heading>
						<Input
							placeholder='Email'
							name='email'
							value={newProduct.email}
							onChange={(e) => setNewProduct({ ...newProduct, email: e.target.value })}
						/>
						<Input
							placeholder='Phone Number'
							name='number'
							value={newProduct.number}
							onChange={(e) => setNewProduct({ ...newProduct, number: e.target.value })}
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