// src/controllers/associacaoController.ts

import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

// Associar uma pessoa a um carro
export const associatePessoaCarro = async (req: Request, res: Response) => {
    try {
        const { pessoaId, carroId } = req.body;
        if (!pessoaId || !carroId) {
            return res.status(400).json({ error: "PessoaId e CarroId são obrigatórios" });
        }
        const newAssociation = await prisma.pessoaPorCarro.create({
            data: {
                pessoaId: Number(pessoaId),
                carroId: Number(carroId)
            }
        });
        res.status(201).json(newAssociation);
    } catch (error) {
        console.error("Erro ao associar pessoa a carro:", error);
        res.status(500).json({ error: "Erro ao associar pessoa a carro" });
    }
};

// Listar todas as associações (com dados da pessoa e do carro)
export const getAllAssociations = async (req: Request, res: Response) => {
    try {
        const associations = await prisma.pessoaPorCarro.findMany({
            include: {
                pessoa: true,
                carro: true
            }
        });
        res.json(associations);
    } catch (error) {
        console.error("Erro ao buscar associações:", error);
        res.status(500).json({ error: "Erro ao buscar associações" });
    }
};

// Excluir uma associação existente
export const deleteAssociation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.pessoaPorCarro.delete({
            where: { id: Number(id) }
        });
        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar associação:", error);
        res.status(500).json({ error: "Erro ao deletar associação" });
    }
};