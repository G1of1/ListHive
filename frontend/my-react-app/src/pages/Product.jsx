import React from 'react'
import { Box, Heading, VStack, HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, useColorModeValue, Flex, List, ListItem } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingSpinner from '../components/skeleton/LoadingSpinner';
import { formatProductDate } from '../util/date';
//TODO: Add image slider for all images;
const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async ({queryKey}) => {
      const [_key, productID ] = queryKey;
      if(!productID) {
        return;
      }
      try {
      const res = await fetch(`/api/products/product/${productID}`);
      console.log("Response: " + res);
      const data = await res.json();
      if(!res.ok) {
        console.error(data.error || 'Something went wrong')
      }
      return data;
    }
    catch(error) {
      console.error(error.message);
    }
  },
  enabled: !!id,
  }) 
  console.log(product);
  //const productDate = formatProductDate(product.createdAt);
  //const product = ({name: "Smart Watch", price: 12.99, image: "data:image/jpeg;base64,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", overview: "The SmartFit Pro is a cutting-edge sports watch designed for athletes and fitness enthusiasts looking to optimize their performance. Combining advanced biometrics, GPS tracking, and AI-driven insights, this wearable provides real-time data to enhance training and recovery Key Features:"})
  const bg = useColorModeValue("gray.100", "gray.800");
  return (
    <>
    {isLoading ? <LoadingSpinner /> : 
    <Flex alignItems="center" justifyContent="center" textAlign="center" w="full">
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      bg={bg}
      w="8xl"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      p={4}
    >
      <Heading textAlign="center" mb={4}>{product.name}</Heading>
      <Link to={`/profile/${product.user.username}`}>
      <Text fontWeight="semibold" fontSize="xl" mb={4}>
          @{product.user.username}
        </Text>
        </Link>
  
      <Image 
        src={product.images[0]} 
        alt={product.name} 
        h={48} 
        w="96" 
        objectFit="cover" 
        mx="auto"
        rounded= 'md'
      />
  
      <Box p={4} textAlign="center" display="flex">
        
        <Box display='flex' justifyContent='center' flexDirection="column" w='50%'>
        <Heading as="h3" size="md" mb={2} color="orange.400">
          Description
        </Heading>
        <List spacing={2} textAlign="left">
          {product?.overview.split("\n").map((line, index) => (
            <ListItem key={index} ml={4} position="relative">
              • {line}
            </ListItem>
          ))}
        </List>
        </Box>
        <Box p={4} justifyContent="center" flexDirection = "column" w="50%">
          <Heading as= "h3" size="md" mb={2} color="orange.400">Price</Heading>
        <Text fontWeight="bold" fontSize="xl" mb={4}>
          ${product.price.toFixed(2)}
        </Text>
        
        <Heading as = 'h3' size = 'md' mb={2} color="orange.400">Contact Info</Heading>
        <Text fontWeight="bold" fontSize="xl" mb={4}>
          Email: {product.contactInfo?.email}<br/>
          Phone: {product.contactInfo?.number}
        </Text>
        </Box>
      </Box>
    </Box>
  </Flex> }
      </>
  )
      
}
  

export default Product