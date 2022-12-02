import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

router.get('/', TeamController.getAll.bind(TeamController));
router.get('/:id', TeamController.getById.bind(TeamController));

export default router;
