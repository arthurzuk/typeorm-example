import { Router, Request, Response } from "express";
import user from './user';
import spent from './spent';
import UserController from "../controllers/UserController";
import {authorization} from '../middlewares';

const routes = Router();

routes.use("/usuario", user);
routes.use("/gasto", authorization, spent);
routes.post("/login", UserController.login);

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
