import express from 'express';
import { middleWare } from '../middleware/middleware.js';
import { getAllProducts, createProduct, updateProduct, deleteProduct, getUserProducts, getProduct, getProductContactInfo, 
getAppliances, getBeauty, getElectronics, getArtsandCrafts, getAuto, getClothing, getShoes, getComputers, getFurniture, 
getFarmAndGarden, getVideoGames, getTools, 
getSports,
getOther } from '../controller/products.js';
//Initialize an the API router.
const router = express.Router();

router.use(express.json());
//Products and categories
router.get('/all', middleWare, getAllProducts);

router.get('/beauty', middleWare, getBeauty);
router.get('/electronics', middleWare, getElectronics);
router.get('/electronics', middleWare, getElectronics);
router.get('/artsandcrafts', middleWare, getArtsandCrafts);
router.get('/auto', middleWare, getAuto);
router.get('/clothing', middleWare, getClothing);
router.get('/shoes', middleWare, getShoes);
router.get('/computers', middleWare, getComputers);
router.get('/furniture', middleWare, getFurniture);
router.get('/farmandgarden', middleWare, getFarmAndGarden);
router.get('/videogames', middleWare, getVideoGames);
router.get('/tools', middleWare, getTools);
router.get('/sports', middleWare, getSports);
router.post('/create', middleWare, createProduct); 
router.get('/appliances', middleWare, getAppliances);
router.get('/other', middleWare, getOther);

//Product Hooks
router.put('/:id', middleWare, updateProduct);
router.delete('/:id', middleWare, deleteProduct); 
router.get('/:id', middleWare, getUserProducts);
router.get('/product/:id', middleWare, getProduct);
router.get('/contact/:id', middleWare, getProductContactInfo);
//router.get('/:category', middleWare, getCategoryProducts);
export default router;