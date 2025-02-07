import { Box, Heading, VStack, HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import { useToast } from '@chakra-ui/react';

 const ProductCard = ({product}) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDeleteProduct = async (id) => {
  const { success, message } = await deleteProduct(id);
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
};
const handleUpdateProduct = async (id, updatedProduct) => {
  const { success, message } = await updateProduct(id, updatedProduct);
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
    onClose();
  }
};

  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition="all 0.3s"
    _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
    >
      <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />
      <Box p={4}>
      <Heading as= 'h3' size='md' mb={2}>
        {product.name}
      </Heading>
      <Text fontWeight="bold" fontSize='l' color={"orange.400"} mb={4}>
        ${product.price.toFixed(2)}
      </Text>
      <Text fontWeight="semibold" fontSize='md' mb={4}>
        {product.overview}
      </Text>
      <HStack spacing={2}>
        <IconButton icon={<EditIcon />} onClick={onOpen}colorScheme={"orange"}></IconButton>
        <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme={"red"}></IconButton>

      </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
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
						<Button colorScheme='orange' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
						<Button variant='ghost' onClick={onClose}>Cancel</Button>
					</ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
export default ProductCard