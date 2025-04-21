import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast, Textarea } from "@chakra-ui/react";
import React, { useRef, useState } from 'react';
import useCreateProduct from "../hooks/useCreateProduct";
import LoadingSpinner from '../components/skeleton/LoadingSpinner'

// TODO: Fix Product Categories
const CreatePage = () => {
	const [categories, setCategories] = useState([]);
	const [ newProduct , setNewProduct ] = useState({
    name: "",
    price : "",
	coverImage: "",
    images : [],
	overview: "",
	email: "",
	number: "",
	categories: categories
 });
 	const [img, setImg] = useState(null);
 	const [coverImg, setCoverImg] = useState(null);
 
 	const imgRef = useRef(null);
 	const coverImgRef = useRef(null);
 	const handleImageSubmit = (e) => {
	const files = Array.from(e.target.files);

	const promises = files.map(file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	});

	Promise.all(promises)
		.then(base64Images => {
			setNewProduct(prev => ({
				...prev,
				images: base64Images,
			}));
		})
		.catch(error => {
			console.error('Error reading image files:', error);
		});
};

// Handles single image (cover)
	const handleCoverImageSubmit = (e) => {
		const file = e.target.files[0];

		if (!file) return;

		const reader = new FileReader();

		reader.onload = () => {
			const base64 = reader.result;
			setCoverImg(base64); // Optional: if you want to preview it separately
			setNewProduct(prev => ({
				...prev,
				coverImage: base64,
			}));
	};

		reader.onerror = () => {
			console.error('Error reading cover image file');
		};

		reader.readAsDataURL(file);
};
	const handleCategories = (category) => {
		setCategories({...categories, category})
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
					Create New Listing
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"} mb={4}>
					<VStack spacing={4}>
						<Heading as={"h3"} size={'lg'} textAlign={"center"} mb={2}>Listing Info</Heading>
						<Heading as={"h4"} size={'sm'} textAlign={"center"} mb={2}>Listing Name</Heading>
						<Input
							placeholder='Name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Heading as={"h4"} size={'sm'} textAlign={"center"} mb={2}>Price</Heading>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Heading as={"h4"} size={'sm'} textAlign={"center"} mb={2}>Description</Heading>
						<Textarea
							placeholder="Description"
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
						<Heading as={"h4"} size={'md'} textAlign={"center"} mb={2}>Listing Images</Heading>
						<Heading as={"h4"} size={'sm'} textAlign={"center"} mb={2}>Cover Image</Heading>
						<input type='file' name = 'coverImage' accept='image/*' ref={coverImgRef} onChange={handleCoverImageSubmit} />
						<Heading as={"h4"} size={'sm'} textAlign={"center"} mb={2}>Additional Images</Heading>
						<input type='file' multiple={true} name='image' accept="image/*" ref={imgRef} onChange={handleImageSubmit}  />
						<Heading as={'h4'} size={'md'} textAlign={'center'} mb={2}>Categories</Heading>
						<Input type='string' 
							name='categories'
							placeholder = "Categories"
						/>
						<Button onClick={handleCategories}>Add Category</Button>

						<Heading as={'h3'} size={'md'} textAlign={'center'} mb={2}>Contact Info</Heading>
						<Input
							placeholder='Email'
							name='email'
							value={newProduct.email}
							onChange={(e) => setNewProduct({ ...newProduct, email: e.target.value})}
						/>
						<Input
							placeholder='Phone Number'
							name='number'
							value={newProduct.number}
							onChange={(e) => setNewProduct({ ...newProduct, number: e.target.value})}
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