import { Box, Heading, VStack, HStack, IconButton, Image, Modal, ModalBody, 
ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter, 
useColorMode, Container, Flex, Button, useDisclosure, Input, useToast, Avatar, 
AvatarBadge, AvatarGroup,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuDivider,
	useColorModeValue
 } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const bg = useColorModeValue("gray.100", "gray.800");
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
  >
	<HStack w='33%' spacing={2} justifyContent='flex-start'>
	  <Link to={"/create"}>
        <Button>
          <FaPlus /> 🛒
        </Button>
      </Link>
    {/* Left Spacer to help center the title */}
	</HStack>
    {/* Centered Title */}
	<Box w='33%'>
    <Text
      fontSize={{ base: "22", sm: "28" }}
      fontWeight={"bold"}
      textAlign={"center"}
      bgGradient={"linear(to-r, orange.400, red.500)"}
      bgClip={"text"}
    >
      <Link to={"/"}>ListHive 🛒</Link>
    </Text>
	</Box>
    {/* Right Buttons */}
    <HStack w="33%" spacing={2} justifyContent="flex-end">
      <Link to={`/products/${authUser.username}`}>
        <Button>Your Products</Button>
      </Link>
	  
	  <Menu>
  <MenuButton
    px={4}
    py={2}
    transition='all 0.2s'
    borderRadius='md'
    borderWidth='1px'
    _expanded={{ bg: 'blue.400' }}
	bg={bg}
  >
    Settings
  </MenuButton>
  <MenuList>
    <MenuItem><Link to={`/profile/${authUser.username}`}>Profile</Link></MenuItem>
    <MenuItem onClick={toggleColorMode}>{colorMode === "light" ? "Dark Mode🌑" : "Light Mode😎"}</MenuItem>
    <MenuDivider />
    <MenuItem onClick={onOpen}>Log Out</MenuItem>
  </MenuList>
</Menu>
    </HStack>
	<Modal isOpen={isOpen} onClose={onClose}>
						<ModalOverlay />
						<ModalContent>
						  <ModalHeader>Are you sure you want to log out?</ModalHeader>
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