import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Match } from '../entities/Matches';
import { Team } from '../entities/Teams';

class MatchController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { idhost, idvisitor, date } = req.body;
        console.log(req.body);
        //verifica se foram fornecidos os parâmetros
        if (!idhost || !idvisitor || !date || date === "") {
            return res.json({ error: "É necessário o id dos matchs e a data" });
        }
        const matchHost: any = await AppDataSource.manager.findOneBy(Team, { id: parseInt(idhost) }).catch((e) => {
            return { error: "Identificador inválido" };
        })

        const matchVisitor: any = await AppDataSource.manager.findOneBy(Team, { id: parseInt(idvisitor) }).catch((e) => {
            return { error: "Identificador inválido" };
        })

        if ( matchHost &&  matchHost.id && matchVisitor &&  matchVisitor.id ) {
            const partida = new Match();
            partida.idhost = idhost;
            partida.idvisitor = idvisitor;
            partida.date = date;
            await AppDataSource.manager.save(Match, partida);
            res.json({ host: { id: matchHost.id, name: matchHost.name }, visitor: { id: matchVisitor.id, name: matchVisitor.name },date: partida.date, id: partida.id});
        }
        else {
            return res.json("Erro ao criar a partida");
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, description, value } = req.body;
        if( !id || id === "" || !description || description === "" || !value || value === ""){
            return res.json({ error: "Identificação, descrição e valor são necessários" });
        }
        const partida: any = await AppDataSource.manager.findOneBy(Match, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        })
        if (partida && partida.id) {
            partida.description = description;
            partida.value = value;
            const r = await AppDataSource.manager.save(Match, partida).catch((e) => e.message);
            return res.json(r);
        }
        else if (partida && partida.error) {
            return res.json({partida});
        }
        else {
            return res.json({ error: "partida não localizado" });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        if( !id || id === "" ){
            return res.json({ error: "Identificação necessária" });
        }
        const partida: any = await AppDataSource.manager.findOneBy(Match, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        });

        if (partida && partida.id) {
            const r = await AppDataSource.manager.remove(Match, partida).catch((e) => e.message);
            return res.json(r);
        }
        else if (partida && partida.error) {
            return res.json(partida);
        }
        else {
            return res.json({ error: "partida não localizada" });
        }
    }

    public async listById(req: Request, res: Response): Promise<Response> {
        // obtém o id do usuário que foi salvo na autorização na middleware
        const { id } = req.params;
        const match: any = await AppDataSource.manager.findOneBy(Match, { id: parseInt(id) }).catch((e) => {
            return { error: "Identificador inválido" };
        })

        if (!match) {
            return res.json({ error: "Usuário não identificado" });
        }
        else {
            return res.json(match)
        }
    }
    
      public async listAll(_: Request, res: Response): Promise<Response> {
    
        const repo = AppDataSource.getRepository(Match);
        const matches = await repo.find({
          order: {
            date: 'desc'
          }
        });
        return res.json(matches);
      }
}

export default new MatchController();