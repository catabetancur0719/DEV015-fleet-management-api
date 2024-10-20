import { Router } from 'express';           
import { getAllTaxis } from '../controllers/taxisControllers';

const router: Router = Router();        //crea una variable router, indica que es tipo router y luego llama la funcion router 

// Ruta para obtener todos los taxis
router.get('/', getAllTaxis);

export default router;