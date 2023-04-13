import { Router } from "express";
import UserController from "../controllers/UserController";
import {authorization} from '../middlewares';

const routes = Router();

routes.post('/', UserController.create);
routes.put('/', authorization, UserController.update);
routes.delete('/', authorization, UserController.delete);

export default routes;