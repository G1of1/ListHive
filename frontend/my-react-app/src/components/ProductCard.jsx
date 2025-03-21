import { Box, Heading, VStack, HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react';
import useUpdateProduct from '../hooks/useUpdateProduct';
import useDeleteProduct from '../hooks/useDeleteProduct';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { formatProductDate } from '../util/date';

 const ProductCard = ({product}) => {
  const {updateProduct, isUpdating } = useUpdateProduct();
  const { deleteProduct , isDeleting } = useDeleteProduct();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const toast = useToast();
  const {data: authUser } = useQuery({queryKey: ['authUser']});
  const { isOpen: editIsOpen, onOpen: editOnOpen, onClose: editOnClose } = useDisclosure();
  const { isOpen: deleteIsOpen, onOpen: deleteOnOpen, onClose: deleteOnClose } = useDisclosure();
  const handleDeleteProduct = async (id) => {
      deleteProduct(id);
};
  const handleUpdateProduct = async (id, updatedProduct) => {
    updateProduct({productID: id, updatedProduct});
    onClose();
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
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
      <Link to={`/product/${product._id}`}>
      <Heading as= 'h3' size='md' mb={2}>
        {product.name}
      </Heading>
      </Link>
      <Text fontWeight="bold" fontSize='xl' color={"orange.400"} mb={4}>
        ${product.price.toFixed(2)}
      </Text>
      <Text fontWeight="extrabold" fontSize='xl' mb={4}>
        By: {product.user.username}
      </Text>
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
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
              <Input
                placeholder='Overview'
                name='overview'
                value={updatedProduct.overview}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, overview: e.target.value })}
              />
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
          </ModalBody>
          <ModalFooter>
						<Button colorScheme='orange' mr={3} onClick={(e) => {e.preventDefault(); handleUpdateProduct(product._id, updatedProduct)}}>Update</Button>
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