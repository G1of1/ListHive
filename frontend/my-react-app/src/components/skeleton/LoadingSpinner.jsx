import { Spinner } from '@chakra-ui/react';
const LoadingSpinner = () => {
    return (
    <Spinner
  thickness='10px'
  speed='0.7s'
  emptyColor='gray.200'
  color='orange.500'
  size='xl'
/>
    )
}

export default LoadingSpinner;