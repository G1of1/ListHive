import React from 'react'
import { Box, Flex, Stack, Container, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <Box bg="gray.900" color="white" py={8}>
        <Container maxW="container.lg">
          <Flex justify="space-between" wrap="wrap" fontSize="sm">
            <Text>© {new Date().getFullYear()} ListHive. All rights reserved.</Text>
            <Stack direction="row" spacing={4}>
              <Link to="/home">Home</Link>
              <Link to="/create">Create Listing</Link>
              <Link to="/about">About</Link>
            </Stack>
          </Flex>
        </Container>
      </Box>
  )
}

export default Footer