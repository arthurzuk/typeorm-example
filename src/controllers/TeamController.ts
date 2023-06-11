import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Team } from '../entities/Teams';
import { ILike } from "typeorm";

class TeamController {

  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    console.log(req.body);
    //verifica se foram fornecidos os parâmetros
    if (!name || name.trim() === "") {
      return res.json({ error: "  Nome do time necessário" });
    }
    const obj = new Team();
    obj.name = name;

    const time: any = await AppDataSource.manager.save(Team, obj).catch((e) => {
      if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
        return { error: 'time já existe' };
      }
      return { error: e.message };
    })
    return res.json(time);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { id } = req.body;
    const r = await AppDataSource
      .createQueryBuilder()
      .delete()
      .from(Team)
      .where("id=:id", { id })
      .execute()

    return res.json(r)
  }

  // o usuário pode atualizar somente os seus dados
  public async update(req: Request, res: Response): Promise<Response> {
    const { id, name } = req.body;
    const time: any = await AppDataSource.manager.findOneBy(Team, { id }).catch((e) => {
      return { error: "Identificador inválido" };
    })
    if (time && time.id) {
      if (name !== "") {
        time.name = name;
      }
      const r = await AppDataSource.manager.save(Team, time).catch((e) => {
        // testa se o e-name é repetido
        if (/(name)[\s\S]+(already exists)/.test(e.detail)) {
          return ({ error: 'time já existe' });
        }
        return e;
      })
      if (!r.error) {
        return res.json({ id: time.id, name: time.name });
      }
      return res.json(r);
    }
    else if (time && time.error) {
      return res.json(name)
    }
    else {
      return res.json({ error: "Time não localizado" });
    }
  }

  public async listBySearch(req: Request, res: Response): Promise<Response> {
    // obtém o id do usuário que foi salvo na autorização na middleware
    const { termo } = req.params;

    const repo = AppDataSource.getRepository(Team);
    const times = await repo.find({
      where: [{
        name: ILike(`%${termo}%`)
    }]
  });
    return res.json(times);
  }

  public async listAll(_: Request, res: Response): Promise<Response> {

    const repo = AppDataSource.getRepository(Team);
    const times = await repo.find({
      order: {
        name: 'asc'
      }
    });
    
    return res.json(times);
  }
}

export default new TeamController();