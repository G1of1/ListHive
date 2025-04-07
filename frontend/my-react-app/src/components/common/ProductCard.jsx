import { Box, Heading, VStack, HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useState, useRef } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useToast } from '@chakra-ui/react';
import useUpdateProduct from '../../hooks/useUpdateProduct';
import useDeleteProduct from '../../hooks/useDeleteProduct';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { formatProductDate } from '../../util/date';
import LoadingSpinner from '../skeleton/LoadingSpinner';

 const ProductCard = ({product}) => {
  const {updateProduct, isUpdating } = useUpdateProduct();
  const { deleteProduct , isDeleting } = useDeleteProduct();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [img, setImg] = useState(null);
  const [coverImg, setCoverImg] = useState(null);
  const toast = useToast();
  const {data: authUser } = useQuery({queryKey: ['authUser']});
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
  const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
  const handleDeleteProduct = async (id) => {
      deleteProduct(id);
};
  const imgRef = useRef(null);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result)
        reader.onerror = reject;
        reader.readAsDataURL(file);
      })
    })

    Promise.all(promises)
    .then(base64Images => {
      setUpdatedProduct(prev => ({...prev, images: base64Images}))
    }).catch(error => {console.log('Error reading image file' + error)})

    
    }
  
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImg(reader.result);
        setUpdatedProduct(prev => ({...prev, coverImage: reader.result}))
      }
      reader.onerror = () => {
        console.log('Error reading cover image file');
      }
    reader.readAsDataURL(file);
  }
  const handleUpdateProduct = async (id, updatedProduct) => {
    console.log(updatedProduct);
    updateProduct({productID: id, updatedProduct});
    if(!isUpdating) {
    editOnClose();
    }
};
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("gray.100", "gray.800");

  const productDate = formatProductDate(product.createdAt);

  return (
    <>
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    bg={bg}
    >
      <Image src={product.images[0]} alt={product.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
      <Link to={`/product/${product._id}`}>
      <Heading as= 'h3' size='md' mb={2}>
        {product.name}
      </Heading>
      </Link>
      <Text fontWeight="bold" fontSize='xl' color={"orange.400"} mb={4}>
        ${product.price.toFixed(2)}
      </Text>
      <Link to={`/profile/${product.user.username}`}>
      <Text fontWeight="extrabold" fontSize='xl' mb={4}>
        By: {product.user.username}
      </Text>
      </Link>
      <Text fontWeight="bold" fontSize='xl' color={"orange.400"} mb={4}>
        {productDate}
      </Text>
      
      <HStack spacing={2}>
        {authUser._id === product.user._id && (<>
        <IconButton icon={<EditIcon />} onClick={editOnOpen}colorScheme={"orange"}></IconButton>
        <IconButton icon={<DeleteIcon />} onClick={deleteOnOpen} colorScheme={"red"}></IconButton></>)}
      </HStack>
      </Box>
      <Modal isOpen={editIsOpen} onClose={editOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <VStack spacing={4}>
              <Heading as={'h4'} size={'sm'} mb={2}>Product Name</Heading>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
              <Heading as={'h4'} size={'sm'} mb={2}>Product Price</Heading>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
              <Heading as={'h4'} size={'sm'} mb={2}>Product Description</Heading>
              <Input
                placeholder='Overview'
                name='overview'
                value={updatedProduct.overview}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, overview: e.target.value })}
              />
              <Heading as={'h4'} size={'sm'} mb={2}>Product Image</Heading>
              <Heading as={'h4'} size={'sm'} mb={2}>Cover Image</Heading>
              <input type='file' name= 'coverImage' accept='image/*' onChange={handleCoverImageChange} />
              <Heading as={'h4'} size={'sm'} mb={2}>Other Images</Heading>
              <input type='file' name='image' accept='image/*' ref={imgRef} onChange={handleImageChange} />
              
						</VStack>
          </ModalBody>
          <ModalFooter>
						{isUpdating ? <LoadingSpinner /> : <Button colorScheme='orange' mr={3} onClick={(e) => {e.preventDefault(); handleUpdateProduct(product._id, updatedProduct)}}>Update</Button>}
						<Button variant='ghost' onClick={editOnClose}>Cancel</Button>
					</ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={deleteIsOpen} onClose={deleteOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure you want to delete this product?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <HStack spacing={4}>
          
						</HStack>
          </ModalBody>
          <ModalFooter>
          <IconButton icon={<DeleteIcon />} onClick={(e) => { e.preventDefault(); handleDeleteProduct(product._id)}} colorScheme={"red"}></IconButton>
						<Button variant='ghost' onClick={deleteOnClose}>Cancel</Button>
					</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </>
  )
}
export default ProductCard