import { Container, Text, VStack, SimpleGrid, useToast, Box, Flex, Input, Button} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import { useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import LoadingSpinner from '../components/skeleton/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';


const HomePage = () => {
//TODO: Finish categories integration
  const toast = useToast();
  const{ data: products, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try{
        const res = await fetch('/api/products/all');
        const data = await res.json();

        if(!res.ok) {
          toast({
            title: 'Error',
            description: data.error,
            status: 'error',
            isClosable: true
          })
        }
        return data;
      }
      catch(error) {
        throw new Error(error.message)
      }
    }

  })
  const [text, setText] = useState('');

  const filteredProducts = products?.filter(product => product.name.toLowerCase().includes(text.toLowerCase()))
  const [category, setCategory] = useState("");
  const appliances = products?.filter(product => product.category === "Appliances");
  const arts = products?.filter(product => product.category === "Arts and Crafts");
  const auto = products?.filter(product => product.category === "Auto")
  const beauty = products?.filter(product => product.category === "Beauty");
  const clothing = products?.filter(product => product.category === "Clothing and Accessories");
  const shoes = products?.filter(product => product.category === "Shoes");
  const electronics = products?.filter(product => product.category === "Electronics");
  const computers = products?.filter(product => product.category === "Computers");
  const furniture = products?.filter(product => product.category === "Furniture");
  const farm = products?.filter(product => product.category === "Farm/Garden");
  const videogames = products?.filter(product => product.category === "Video Games");
  const tools = products?.filter(product => product.category === "Tools");
  const sports = products?.filter(product => product.category === "Sports");
  const other = products?.filter(product => product.category === "Other");

  
  
  return (
    <Container maxW="container.xl" py={12} >
      <Tabs size={'sm'} variant='enclosed' isFitted>
  <TabList>
    <Tab>All Listings</Tab>
    <Tab>Appliances</Tab>
    <Tab>Arts and Crafts</Tab>
    <Tab>Auto</Tab>
    <Tab>Beauty</Tab>
    <Tab>Clothing and Accessories</Tab>
    <Tab>Shoes</Tab>
    <Tab>Electronics</Tab>
    <Tab>Computers</Tab>
    <Tab>Furniture</Tab>
    <Tab>Farm/Garden</Tab>
    <Tab>Video Games</Tab>
    <Tab>Tools</Tab>
    <Tab>Sports</Tab>
    <Tab>Other</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <VStack spacing={8}>
      <Text fontSize={30} fontWeight={"bold"} bgGradient={"linear(to-r, orange.400, red.400)"} bgClip={"text"} textAlign={"center"}>Listings✨</Text>
      <Box w={"50%"} rounded={'lg'} shadow={'md'} p={6} align={'center'} alignItems={'center'} justifyContent={'center'}>
        <Input w={"65%"} placeholder='Search 🔍' value={text} onChange={(e)=> {setText(e.target.value)}}/>
      </Box>
      {isLoading ? (
  <Flex w="100vw" h="80vh" justify="center" align="center">
    <LoadingSpinner />
  </Flex>
) : (
  <SimpleGrid
    columns={{ base: 1, md: 2, lg: 3 }}
    spacing={10}
    w="full"
  >
    {filteredProducts.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
    </SimpleGrid>
)}
      {filteredProducts?.length === 0 && 
      (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
      </VStack>
    </TabPanel>
    <TabPanel name = "appliances">
      {!isLoading && appliances.map((appliance) => (<ProductCard key={appliance._id} product={appliance} />))}
      {appliances?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel name="arts and crafts">
    {!isLoading && arts.map((art) => (<ProductCard key={art._id} product={art} />))}
      {arts?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && auto.map((auto) => (<ProductCard key={auto._id} product={auto} />))}
      {auto?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && beauty.map((beauty) => (<ProductCard key={beauty._id} product={beauty} />))}
      {beauty?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && clothing.map((clothing) => (<ProductCard key={clothing._id} product={clothing} />))}
      {clothing?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && shoes.map((shoes) => (<ProductCard key={shoes._id} product={shoes} />))}
      {shoes?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && electronics.map((electronics) => (<ProductCard key={electronics._id} product={electronics} />))}
      {electronics?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && computers.map((computers) => (<ProductCard key={computers._id} product={computers} />))}
      {computers?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && furniture.map((furniture) => (<ProductCard key={furniture._id} product={furniture} />))}
      {furniture?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && farm.map((farm) => (<ProductCard key={farm._id} product={farm} />))}
      {farm?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && videogames.map((videogames) => (<ProductCard key={videogames._id} product={videogames} />))}
      {videogames?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && tools.map((tools) => (<ProductCard key={tools._id} product={tools} />))}
      {tools?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && sports.map((sports) => (<ProductCard key={sports._id} product={sports} />))}
      {sports?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
    <TabPanel>
    {!isLoading && other.map((other) => (<ProductCard key={other._id} product={other} />))}
      {other?.length === 0 && (<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
        No Products found...{" "}
        <Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Listing😎
							</Text>
						</Link>
      </Text>)}
    </TabPanel>
  </TabPanels>
</Tabs>
      
      </Container>
  )
}

export default HomePage