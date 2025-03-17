import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
const useDeleteProduct = () => {
    const toast = useToast();
    const query = useQueryClient();
    const {mutate: deleteProduct, isPending: isDeleting } = useMutation({
        mutationFn: async (productID) => {
          try {
            const res = await fetch(`/api/products/${productID}`, {
              method: 'DELETE'
            });
            const data = await res.json();
    
            if(!res.ok) {
              console.error(data.error || 'Something went wrong');
              return data;
            }
            return data;
          }
          catch(error) {
            console.error(error.message)
          }
        },
        onSuccess: (data) => {
          if(data.error) {
            toast({
              title: 'Error',
              description: data.error,
              status: 'error',
              isClosable: true
            })
          }
          else {
          toast({
            title: 'Success',
            description: 'Product deleted!🫡',
            status: 'success',
          })
          query.invalidateQueries(['products'])
        }
        }
      });
      return {deleteProduct, isDeleting};
}
export default useDeleteProduct;