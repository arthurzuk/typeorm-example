import { Router } from "express";
import MatchController from "../controllers/MatchController";

const routes = Router();

routes.get('/', MatchController.listAll);
routes.post('/', MatchController.create);
routes.put('/', MatchController.update);
routes.delete('/', MatchController.delete);
routes.get('/:id', MatchController.listById);

export default routes;