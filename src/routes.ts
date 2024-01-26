import { Router } from 'express'
import { TransactionController } from './controllers/TransactionController'

const routes = Router();

routes.post('/transaction', new TransactionController().newTransaction);

export default routes;