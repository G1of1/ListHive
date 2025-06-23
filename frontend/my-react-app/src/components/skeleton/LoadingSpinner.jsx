import { CircularProgress } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <CircularProgress
      isIndeterminate
      color="orange.400"
      size="24px" // Set an explicit small size
      thickness="4px" // Optional: makes the spinner thinner
    />
  );
};

export default LoadingSpinner;