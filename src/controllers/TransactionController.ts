import { Request, Response } from 'express'
import { transactionRepository } from '../repositories/transactionRepository';
import { Transaction } from '../entities/Transaction';
import { User } from '../entities/User';

export class TransactionController {

    async newTransaction(req: Request, res: Response) {
        const user = req.user;
        const { value, date, type } = req.body

        if (!value || value <= 0) return res.status(400).json({ mensagem: 'Um valor válido é obrigatório' });
        if (!date) return res.status(400).json({ mensagem: 'A data é obrigatória' });
        if (!type) return res.status(400).json({ mensagem: 'O tipo é obrigatório' });

        try {
            const transaction = new Transaction();
            transaction.value = value;
            transaction.date = date;
            transaction.type = type;
            transaction.user = user as User;

            await transactionRepository.save(transaction);
            return res.status(201).json(transaction);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' })
        }
    }

    async getTransactions(req: Request, res: Response) {
        const user = req.user;

        try {
            const allTransactions = await transactionRepository.createQueryBuilder()
                .select('transaction')
                .from(Transaction, 'transaction')
                .where({ user: user })
                .distinct()
                .getRawMany()

            return res.json(allTransactions);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' })
        }
    }

    async editTransaction(req: Request, res: Response) {
        const { id } = req.params
        const { value, date, type } = req.body;

        try {
            const transactionId = Number(id);
            const transaction = await transactionRepository.findOne({ where: { id: transactionId } })

            if (!transaction) return res.status(400).json('Não foi encontrada transação com este id');

            await transactionRepository.createQueryBuilder()
                .update(Transaction)
                .set({ value: value, date: date, type: type })
                .where({ id: transactionId })
                .execute();
            return res.status(201).json('Transação alterada com sucesso');

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' })
        }
    }

    async deleteTransaction(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const transactionId = Number(id);
            const transaction = await transactionRepository.findOne({ where: { id: transactionId } })

            if (!transaction) return res.status(400).json('Não foi encontrada transação com este id');

            await transactionRepository.createQueryBuilder()
                .delete()
                .where({ id: transactionId })
                .execute();
            return res.status(201).json('Transação removida com sucesso');

        } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro interno do servidor' })
        }
    }


}
