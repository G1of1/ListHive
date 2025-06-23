import {
  useQuery
} from '@tanstack/react-query';
import {
  useParams
} from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  Avatar,
  SimpleGrid,
  Link,
  Divider,
  VStack,
  SkeletonCircle,
  SkeletonText,
  Badge
} from '@chakra-ui/react';
import {
  MemberSince
} from '../../util/date';
import LoadingSpinner from '../../components/skeleton/LoadingSpinner';

const ProfilePage = () => {
  const {
    username
  } = useParams();

  const {
    data: user,
    isLoading: isGettingProfile
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const res = await fetch(`/api/profile/${username}`);
      const data = await res.json();
      if (!res.ok) {
        console.error(data.error);
      }
      return data;
    }
  });

  const userDate = MemberSince(user?.createdAt);
  const bg = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Flex align="center" justify="center" px={4} py={10} minH="100vh" bg={bg}>
      {isGettingProfile ? (
        <LoadingSpinner />
      ) : (
        <Box
          bg={cardBg}
          maxW="5xl"
          w="full"
          rounded="2xl"
          shadow="xl"
          p={8}
          transition="all 0.3s ease"
        >
          <Flex direction="column" align="center" mb={6}>
            <Avatar
              size="2xl"
              name={username}
              src={user?.avatar}
              mb={4}
              shadow="md"
            />
            <Heading fontSize="2xl" fontWeight="bold">
              {username}
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Member since {userDate}
            </Text>
          </Flex>

          <Divider mb={6} />

          <Box>
            <Heading
              size="md"
              color="orange.400"
              mb={4}
              textAlign="center"
              fontWeight="semibold"
            >
              {username}'s Products
            </Heading>

            {user?.products?.length > 0 ? (
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                {user.products.map((product) => (
                  <Box
                    key={product._id}
                    p={4}
                    bg={useColorModeValue("gray.100", "gray.700")}
                    rounded="lg"
                    shadow="sm"
                    _hover={{ shadow: "md", transform: "translateY(-2px)" }}
                    transition="0.2s"
                    textAlign="center"
                  >
                    <Link
                      href={`/product/${product._id}`}
                      fontWeight="medium"
                      fontSize="lg"
                      color="orange.400"
                      _hover={{ textDecor: "underline" }}
                    >
                      {product.name}
                    </Link>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Text textAlign="center" color="gray.500">
                This user hasn’t posted any products yet.
              </Text>
            )}
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default ProfilePage;
