import { Button, Container, Flex, HStack, Text, useColorMode} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
const UnAuthNavBar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
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
                      <Link to={"/register"}><Button>Register</Button></Link>
                      <Link to={"/login"}><Button>Login</Button></Link>
                      <Button onClick={toggleColorMode}>
                          {colorMode === "light" ? "🌑" : "😎"}
                      </Button>
                  </HStack>
              </Flex>
          </Container>
    );
}

export default UnAuthNavBar;