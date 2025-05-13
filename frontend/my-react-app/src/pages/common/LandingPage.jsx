import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
  VStack,
  SimpleGrid,
  Icon,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaTags, FaSearch, FaPlusCircle } from 'react-icons/fa';
import { GiTreeBeehive } from "react-icons/gi";

const LandingPage = () => {
  return (
    <Box bg="gray.50" minH="100vh">
      {/* Hero Section */}
      <Box bg={'orange.400'}color="white" py={20}>
        <Container maxW="container.xl">
          <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="space-between">
            <VStack align="start" spacing={6} maxW="lg">
              <Heading size="2xl">Welcome to ListHive 🐝</Heading>
              <Text fontSize="lg">
                Buy, sell, or trade anything with ease. Your community-driven listing platform.
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
                <Button colorScheme="whiteAlpha" as={Link} to="/create">
                  Create a Listing
                </Button>
                <Button bg="white" color="orange.400" _hover={{ bg: 'gray.100' }} as={Link} to="/login">
                  Browse Listings
                </Button>
              </Stack>
            </VStack>
            <GiTreeBeehive size="sm"/>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={12}>
      <Container maxW="container.lg" bg={useColorModeValue('white', 'gray.800')} py={16}>
        <Heading textAlign="center" mb={10}>
          Why ListHive?
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature icon={FaTags} title="All Kinds of Items" text="From furniture to electronics, we got it." />
          <Feature icon={FaSearch} title="Easy Discovery" text="Smart search and category filtering." />
          <Feature icon={FaPlusCircle} title="Post in Seconds" text="Quickly create listings with photos." />
        </SimpleGrid>
      </Container>
      </Box>

      {/* Placeholder for Testimonials or Call to Action */}
      <Box bg={useColorModeValue('white', 'gray.800')} py={12}>
        <Container maxW="container.md" textAlign="center">
          <Heading size="lg" mb={4}>Join the Hive Today 🐝</Heading>
          <Text mb={6}>List your first item or find a great deal near you.</Text>
          <Button size="lg" colorScheme="orange" as={Link} to="/create">
            Get Started
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

const Feature = ({ icon, title, text }) => (
  <VStack align="center" textAlign="center">
    <Icon as={icon} w={10} h={10} color="orange.400" />
    <Text fontWeight="bold" fontSize="xl">{title}</Text>
    <Text color="gray.600">{text}</Text>
  </VStack>
);

export default LandingPage;