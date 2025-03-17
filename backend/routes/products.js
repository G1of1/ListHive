import express from 'express';
import { middleWare } from '../middleware/middleware.js';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getUserProducts, getProduct } from '../controller/products.js';
//Initialize an the API router.
const router = express.Router();

router.use(express.json()); //allows the program to accept the json data to use for processes.
router.get('/all', middleWare, getAllProducts); //Gets all the products from the database
router.post('/create', middleWare, createProduct); //Creates a new product in the database.
router.put('/:id', middleWare, updateProduct); //Updates a specific product from the database.
router.delete('/:id', middleWare, deleteProduct); //Deletes products from the database.
router.get('/:id', middleWare, getUserProducts);
router.get('/product/:id', middleWare, getProduct);
export default router;