import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
const useCreateProduct = () => {
    const toast = useToast();
    const query = useQueryClient();
    const navigate = useNavigate();
    const {mutate: createProduct, isPending: isCreating } = useMutation({
        mutationFn: async ({product}) => {
          try {
            console.log(product);
            const res = await fetch(`/api/products/create`, {
                method: "POST",
			          headers: {"Content-Type": "application/json"},
			          body: JSON.stringify({name: product.name, price: product.price, overview: product.overview, images: product.images, coverImage: product.coverImage})
            })
            const data = await res.json()
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
                description: 'Product created!😁',
                status: 'success',
            })
            query.invalidateQueries(['products']);
            navigate("/")
        }
      }
      });
      return {createProduct, isCreating };
}
export default useCreateProduct;