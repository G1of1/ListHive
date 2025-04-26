import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom';
import { Box, Flex, Heading, Text, useColorModeValue, Avatar, AvatarBadge, AvatarGroup, List, ListItem} from '@chakra-ui/react';
import { MemberSince } from '../../util/date';
import LoadingSpinner from '../../components/skeleton/LoadingSpinner';
const ProfilePage = () => {
const { username } = useParams();
    const { data: user, isLoading: isGettingProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
        const res = await fetch(`/api/profile/${username}`);
        const data = await res.json();
        console.log(data);
        if(!res.ok) {
            console.error(data.error);
        }
        return data;
    }
})
const { data: authUser, isLoading, isRefetching, refetch } = useQuery({queryKey: ['authUser']})
const userDate = MemberSince(user?.createdAt);
const bg = useColorModeValue("gray.100", "gray.800");
return (
    <Flex alignItems="center" justifyContent="center" textAlign="center" w="full">
      {isGettingProfile ? <LoadingSpinner /> :
        <Box
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          transition="all 0.3s"
          w="8xl"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          p={4}
          bg={bg}
        >
          
          <Box display='flex' justifyContent='center'>
          <Avatar size='xl' name={username} src={user?.avatar} />
          </Box>
          <Heading textAlign="center" mb={2}></Heading>
          <Text fontWeight="semibold" fontSize="xl" mb={1}>
              {username}
            </Text>
          <Box p={4} textAlign="center" display="flex" flexDirection='column' justifyContent='center'>
              <Text>{userDate}</Text>
            <Box>
              <Text>{username} 's Products: </Text>
              <List spacing={2}>
                {user?.products.map((product)=> {
                  return <Link to={`/product/${product._id}`}><ListItem key={product._id}>- {product.name}</ListItem></Link>
                })}
              </List>
            </Box>
          </Box>
        </Box>
}
      </Flex>
)
}

export default ProfilePage;