import { Request, Response } from 'express'
import { transactionRepository } from '../repositories/transactionRepository';
import { Transaction } from '../entities/Transaction';


export class TransactionController {

    async newTransaction(req: Request, res: Response) {
        const { value, date, type, user_id } = req.body

        if(!value) return res.status(400).json({mensagem: 'O valor é obrigatório'});
        if(!date) return res.status(400).json({mensagem: 'A data é obrigatória'});
        if(!type) return res.status(400).json({mensagem: 'O tipo é obrigatório'});

        try {
            
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({mensagem: 'Erro interno do servidor'})
        }
    }


}
