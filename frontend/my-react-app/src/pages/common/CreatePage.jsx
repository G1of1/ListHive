import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  VStack,
  Textarea,
  SimpleGrid,
  Radio,
  RadioGroup,
  Stack,
  FormControl,
  FormLabel,
  Image,
  Divider
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import useCreateProduct from "../../hooks/useCreateProduct";
import LoadingSpinner from "../../components/skeleton/LoadingSpinner";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    coverImage: "",
    images: [],
    overview: "",
    email: "",
    number: "",
    category: ""
  });

  const [coverImg, setCoverImg] = useState(null);
  const imgRef = useRef(null);
  const coverImgRef = useRef(null);

  const { createProduct, isCreating } = useCreateProduct();

  const handleImageSubmit = (e) => {
    const files = Array.from(e.target.files);
    const promises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        setNewProduct((prev) => ({
          ...prev,
          images: base64Images
        }));
      })
      .catch((error) => {
        console.error("Error reading image files:", error);
      });
  };

  const handleCoverImageSubmit = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setCoverImg(base64);
      setNewProduct((prev) => ({
        ...prev,
        coverImage: base64
      }));
    };
    reader.readAsDataURL(file);
  };

  const addProduct = async () => {
    const data = await createProduct({ product: newProduct });
    if (!data.error) {
      setNewProduct({
        name: "",
        price: "",
        coverImage: "",
        images: [],
        overview: "",
        email: "",
        number: "",
        category: ""
      });
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center" fontSize="3xl">
          Create New Listing
        </Heading>

        <Box
          bg={cardBg}
          p={8}
          rounded="xl"
          shadow="lg"
          spacing={6}
        >
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel fontWeight="bold">Listing Name</FormLabel>
              <Input
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="bold">Price</FormLabel>
              <Input
                placeholder="Enter price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="bold">Description</FormLabel>
              <Textarea
                placeholder="Write a short overview"
                value={newProduct.overview}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, overview: e.target.value })
                }
              />
            </FormControl>

            <Divider />

            <FormControl>
              <FormLabel fontWeight="bold">Cover Image</FormLabel>
              <Input
                type="file"
                accept="image/*"
                ref={coverImgRef}
                onChange={handleCoverImageSubmit}
              />
              {coverImg && (
                <Image
                  mt={3}
                  src={coverImg}
                  alt="Cover Preview"
                  rounded="md"
                  maxH="200px"
                  objectFit="cover"
                />
              )}
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="bold">Additional Images</FormLabel>
              <Input
                type="file"
                accept="image/*"
                multiple
                ref={imgRef}
                onChange={handleImageSubmit}
              />
            </FormControl>

            <Divider />

            <FormControl>
              <FormLabel fontWeight="bold">Category</FormLabel>
              <RadioGroup
                value={newProduct.category}
                onChange={(val) =>
                  setNewProduct({ ...newProduct, category: val })
                }
              >
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={3}>
                  {[
                    "Appliances",
                    "Arts and Crafts",
                    "Auto",
                    "Beauty",
                    "Clothing and Accessories",
                    "Shoes",
                    "Electronics",
                    "Computers",
                    "Furniture",
                    "Farm/Garden",
                    "Video Games",
                    "Tools",
                    "Sports",
                    "Other"
                  ].map((cat) => (
                    <Radio key={cat} value={cat} colorScheme="orange">
                      {cat}
                    </Radio>
                  ))}
                </SimpleGrid>
              </RadioGroup>
            </FormControl>

            <Divider />

            <FormControl>
              <FormLabel fontWeight="bold">Contact Email</FormLabel>
              <Input
                placeholder="Your email"
                value={newProduct.email}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="bold">Phone Number</FormLabel>
              <Input
                placeholder="Your phone number"
                value={newProduct.number}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, number: e.target.value })
                }
              />
            </FormControl>

            <Button
              w="full"
              colorScheme="orange"
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                addProduct();
              }}
              isDisabled={isCreating}
            >
              {isCreating ? <LoadingSpinner /> : "Add Product"}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
