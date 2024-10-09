import { Router } from 'express';
import { getAllTrajectories } from '../controllers/trajectoryControlls'

const router: Router = Router();

// Ruta para obtener todas las trayectorias
router.get('/', getAllTrajectories);

export default router;