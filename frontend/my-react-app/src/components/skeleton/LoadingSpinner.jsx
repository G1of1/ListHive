import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
const LoadingSpinner = () => {
    return (
    
      <CircularProgress isIndeterminate color='orange.400' size={'sm'} />
    )
}

export default LoadingSpinner;