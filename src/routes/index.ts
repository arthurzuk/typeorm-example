import { Router, Request, Response } from "express";
import Team from './team';
import Match from './match';

const routes = Router();

routes.use("/team", Team);
routes.use("/match", Match);

//aceita qualquer método HTTP ou URL
routes.use( (req:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default routes;
