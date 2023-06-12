import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Match } from '../entities/Matches';
import { Team } from '../entities/Teams';

class MatchController {

    //OK
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

        if (matchHost && matchHost.id && matchVisitor && matchVisitor.id) {
            const partida = new Match();
            partida.idhost = idhost;
            partida.idvisitor = idvisitor;
            partida.date = date;
            await AppDataSource.manager.save(Match, partida);
            res.json({ host: { id: matchHost.id, name: matchHost.name }, visitor: { id: matchVisitor.id, name: matchVisitor.name }, date: partida.date, id: partida.id });
        }
        else {
            return res.json("Erro ao criar a partida");
        }
    }

    //OK
    public async update(req: Request, res: Response): Promise<Response> {
        const { id, idhost, idvisitor, date } = req.body;
        if (!id || id === "" || !idhost || !idvisitor || !date || date === "") {
            return res.json({ error: "Identificação da partida, dos times e as datas são necessárias" });
        }
        const partida: any = await AppDataSource.manager.findOneBy(Match, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        })
        if (partida && partida.id) {
            partida.idhost = idhost;
            partida.idvisitor = idvisitor;
            partida.date = date;
            const r = await AppDataSource.manager.save(Match, partida).catch((e) => e.message);
            return res.json(r);
        }
        else if (partida && partida.error) {
            return res.json({ partida });
        }
        else {
            return res.json({ error: "partida não localizado" });
        }
    }

    //OK
    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        if (!id || id === "") {
            return res.json({ error: "Identificação necessária" });
        }     

            const r = await AppDataSource
                .createQueryBuilder()
                .delete()
                .from(Match)
                .where("id=:id", { id })
                .execute()

            return res.json({
                "raw": r.raw,
                "affected": r.affected
            });
    }

    //OK
    public async listById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const match = await AppDataSource
                .getRepository(Match)
                .createQueryBuilder()
                .where("idhost=:id", { id })
                .orWhere("idVisitor=:id", { id })
                .execute()
                .catch((e) => {
                    return { error: "Identificador inválido" };
                })

        if (!match) {
            return res.json({ error: "Não foi encontrado partidas." });
        }
        else {
            return res.json(match)
        }
    }

    //OK
    public async listAll(_: Request, res: Response): Promise<Response> {

        const repo = AppDataSource.getRepository(Match);
        /* const matches = await repo.find({
            select:{
                id: true,
                date: true
            },
            order: {
                date: 'desc'
            }
        }); */

        const matches = await AppDataSource
        .getRepository(Match)
        .createQueryBuilder()
        .execute()
        .catch((e) => {
            return { error: "Identificador inválido" };
        })

        return res.json(matches);
    }
}

export default new MatchController();