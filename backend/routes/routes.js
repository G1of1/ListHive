import express from 'express';

import { getProducts, createProduct, updateProduct, deleteProduct } from '../controller/controller.js';
//Initialize an the API router.
const router = express.Router();

router.use(express.json()); //allows the program to accept the json data to use for processes.
router.get('/', getProducts); //Gets all the products from the database
router.post('/', createProduct); //Creates a new product in the database.
router.put('/:id', updateProduct); //Updates a specific product from the database.
router.delete('/:id', deleteProduct); //Deletes products from the database.

export default router;