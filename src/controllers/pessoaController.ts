    // src/controllers/pessoaController.ts

    import { PrismaClient } from "@prisma/client";
    import type { Request, Response } from "express";

    const prisma = new PrismaClient();

    // Criar uma pessoa
    export const createPessoa = async (req: Request, res: Response) => {
        try {
            const { nome, email } = req.body;
            if (!nome || !email) {
                return res.status(400).json({ error: "Nome e email são obrigatórios" });
            }
            const newPessoa = await prisma.pessoa.create({
                data: {
                    nome,
                    email
                }
            });
            res.status(201).json(newPessoa);
        } catch (error) {
            console.error("Erro ao criar pessoa:", error);
            res.status(500).json({ error: "Erro ao criar pessoa" });
        }
    };

    // Listar todas as pessoas
    export const getPessoa = async (req: Request, res: Response) => {
        try {
            const pessoas = await prisma.pessoa.findMany();
            res.json(pessoas);
        } catch (error) {
            console.error("Erro ao buscar pessoas:", error);
            res.status(500).json({ error: "Erro ao buscar pessoas" });
        }
    };

    // Buscar pessoa por id
    export const getPessoaById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const pessoa = await prisma.pessoa.findUnique({
                where: { id: Number(id) }
            });
            if (!pessoa) {
                return res.status(404).json({ error: "Pessoa não encontrada" });
            }
            res.json(pessoa);
        } catch (error) {
            console.error("Erro ao buscar pessoa por ID:", error);
            res.status(500).json({ error: "Erro ao buscar pessoa" });
        }
    };

    // Atualizar pessoa por id
    export const updatePessoa = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { nome, email } = req.body;
            const updatedPessoa = await prisma.pessoa.update({
                where: { id: Number(id) },
                data: { nome, email }
            });
            res.json(updatedPessoa);
        } catch (error) {
            console.error("Erro ao atualizar pessoa:", error);
            res.status(500).json({ error: "Erro ao atualizar pessoa" });
        }
    };

    // Excluir pessoa por id
    export const deletePessoa = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await prisma.pessoa.delete({
                where: { id: Number(id) }
            });
            res.status(204).send();
        } catch (error) {
            console.error("Erro ao deletar pessoa:", error);
            res.status(500).json({ error: "Erro ao deletar pessoa" });
        }
    };