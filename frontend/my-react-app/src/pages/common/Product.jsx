import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/skeleton/LoadingSpinner';

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async ({ queryKey }) => {
      const [, productID] = queryKey;
      if (!productID) return;
      const res = await fetch(`/api/products/product/${productID}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      return data;
    },
    enabled: !!id,
  });

  const productImages = product ? [product.coverImage, ...product.images] : [];
  productImages.pop(); // Remove empty one if needed

  const [index, setIndex] = useState(0);
  const nextImage = () => setIndex((prev) => (prev + 1) % productImages.length);
  const prevImage = () => setIndex((prev) => (prev - 1 + productImages.length) % productImages.length);

  const bg = useColorModeValue('white', 'gray.900');

  if (isLoading) {
    return (
      <Flex w="100vw" h="80vh" justify="center" align="center">
        <LoadingSpinner />
      </Flex>
    );
  }

  return (
    <Flex justify="center" py={10} px={4}>
      <Box
        bg={bg}
        p={8}
        rounded="lg"
        shadow="lg"
        maxW="5xl"
        w="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading mb={2} textAlign="center">{product.name}</Heading>

        <ChakraLink as={Link} to={`/profile/${product.user.username}`} mb={4} fontWeight="medium" fontSize="lg" color="orange.400">
          @{product.user.username}
        </ChakraLink>

        {/* Image Viewer */}
        <Flex align="center" justify="center" gap={4} mb={6}>
          <FaChevronLeft onClick={prevImage} aria-label="Previous" />
          <Image
            src={productImages[index]}
            alt={product.name}
            maxW="500px"
            maxH="400px"
            objectFit="contain"
            borderRadius="md"
            shadow="md"
          />
          <FaChevronRight onClick={nextImage} aria-label="Next" />
        </Flex>

        {/* Product Info */}
        <Stack direction={['column', 'row']} spacing={8} w="full">
          {/* Description */}
          <Box flex="1">
            <Heading size="md" mb={2} color="orange.400">
              Description
            </Heading>
            <Text>{product?.overview}</Text>
          </Box>

          {/* Price & Contact Info */}
          <Box flex="1">
            <Heading size="md" mb={2} color="orange.400">
              Price
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
              ${product.price.toFixed(2)}
            </Text>

            <Heading size="md" mb={2} color="orange.400">
              Contact Info
            </Heading>
            <Text fontSize="md">
              <strong>Email:</strong> {product.contactInfo?.email}
              <br />
              <strong>Phone:</strong> {product.contactInfo?.number}
            </Text>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Product;
