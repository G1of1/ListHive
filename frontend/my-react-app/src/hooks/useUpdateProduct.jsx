import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
const useUpdateProduct = () => {
    const toast = useToast();
    const query = useQueryClient();
    const {mutate: updateProduct, isPending: isUpdating } = useMutation({
        mutationFn: async ({productID, updatedProduct}) => {
          try {
            console.log(productID);
            console.log(updatedProduct);
            const res = await fetch(`/api/products/${productID}`, {
                method: "PUT",
			          headers: {"Content-Type": "application/json"},
			          body: JSON.stringify(updatedProduct)
            });
            console.log(updatedProduct);
            const data = await res.json();
    
            if(!res.ok) {
             console.error(data.error || 'Something went wrong')
             return data;
            }
            return data;
          }
          catch(error) {
            throw new Error(error.message)
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
                description: 'Product updated!😁',
                status: 'success',
            })
            query.invalidateQueries(['products']);
        }
      }
      });
      return {updateProduct, isUpdating };
}
export default useUpdateProduct;