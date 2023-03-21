import AppDataSource from "../data-source";
import { Request, Response } from 'express';
import { Spent } from '../entities/Spent';
import { User } from '../entities/User';

class SpentController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { description, value } = req.body;
        //verifica se foram fornecidos os parâmetros
        if (!description || !value || description.trim() === "" || value === "") {
            return res.json({ error: "A descrição e valor do gasto são necessários" });
        }
        // obtém o id do usuário que foi salvo na autorização na middleware
        const { id } = res.locals;
        const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        })

        if (usuario && usuario.id) {
            const gasto = new Spent();
            gasto.user = usuario;
            gasto.description = description;
            gasto.value = parseFloat(value);
            await AppDataSource.manager.save(Spent, gasto);
            res.json({ id: gasto.id, description: gasto.description, value: gasto.value });
        }
        else {
            return res.json(usuario);
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id, description, value } = req.body;
        if( !id || id === "" || !description || description === "" || !value || value === ""){
            return res.json({ error: "Identificação, descrição e valor são necessários" });
        }
        const gasto: any = await AppDataSource.manager.findOneBy(Spent, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        })
        if (gasto && gasto.id) {
            gasto.description = description;
            gasto.value = value;
            const r = await AppDataSource.manager.save(Spent, gasto).catch((e) => e.message);
            return res.json(r);
        }
        else if (gasto && gasto.error) {
            return res.json({gasto});
        }
        else {
            return res.json({ error: "Gasto não localizado" });
        }
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.body;
        if( !id || id === "" ){
            return res.json({ error: "Identificação necessária" });
        }
        const gasto: any = await AppDataSource.manager.findOneBy(Spent, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        });

        if (gasto && gasto.id) {
            const r = await AppDataSource.manager.remove(Spent, gasto).catch((e) => e.message);
            return res.json(r);
        }
        else if (gasto && gasto.error) {
            return res.json(gasto);
        }
        else {
            return res.json({ error: "Gasto não localizado" });
        }
    }

    public async list(req: Request, res: Response): Promise<Response> {
        // obtém o id do usuário que foi salvo na autorização na middleware
        const { id } = res.locals;
        const usuario: any = await AppDataSource.manager.findOneBy(User, { id }).catch((e) => {
            return { error: "Identificador inválido" };
        })

        if (usuario && usuario.id) {
            const repo = AppDataSource.getRepository(Spent);
            const gastos = await repo.find({
                /*relations:{
                    user:true
                },*/
                where: { user: { id } },
                order: {
                    description: 'asc'
                }
            });
            return res.json(gastos);
        }
        else if (!usuario) {
            return res.json({ error: "Usuário não identificado" });
        }
        else {
            return res.json(usuario)
        }
    }
}

export default new SpentController();