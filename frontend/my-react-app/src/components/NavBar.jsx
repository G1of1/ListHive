import { Box, Heading, VStack, HStack, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, useColorMode, Container, Flex, Button, useDisclosure, Input, useToast } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const query = useQueryClient();
  const {mutate: logOut} = useMutation({
	mutationFn: async () => {
		try {
			const res = await fetch('/api/auth/logout',{
			method: 'POST'
			});
			const data = await res.json();
			if(!res.ok) {
				throw new Error(data.error || 'Something went wrong')
			}
		}
		catch(error) {
			throw new Error(error.message)
		}
	},
	onSuccess: () => {
		query.invalidateQueries({queryKey: ['authUser']});
	},
	onError: () => {
		toast({
			title: "Error",
			description: "Logout failed",
			duration: 7000
		})
	}
  })
  const { data: authUser } = useQuery({queryKey: ['authUser']});
  return (
    <Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textAlign={"center"}
					bgGradient={"linear(to-r, orange.400, red.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>ListHive 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={`/products/${authUser.username}`}><Button>Your Products</Button></Link>
					<Link to={"/create"}>
						<Button>
            				<FaPlus />
						</Button>
					</Link>
					<Button onClick={toggleColorMode}>
						{colorMode === "light" ? "🌑" : "😎"}
					</Button>
					<Button onClick={onOpen}>Log Out</Button>
				</HStack>
				<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
						  <ModalHeader>Are you sure you want to Log out?</ModalHeader>
						  <ModalCloseButton />
						  <ModalBody>
						  <VStack spacing={4}>
										</VStack>
						  </ModalBody>
						  <ModalFooter>
										<Button colorScheme='orange' mr={3} onClick={(e) => {
											e.preventDefault()
											logOut();
										}
											}>Log Out</Button>
										<Button variant='ghost' onClick={onClose}>Cancel</Button>
									</ModalFooter>
						</ModalContent>
					  </Modal>
			</Flex>
		</Container>
  );
};


export default NavBar