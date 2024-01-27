import { Router } from 'express'
import { TransactionController } from './controllers/TransactionController'
import { UserController } from './controllers/UserController';
import { verifyToken } from './middlewares/verifytoken';

const routes = Router();

routes.post('/signup', new UserController().signUp);
routes.post('/login', new UserController().login);

routes.use(verifyToken);

routes.get('/user', new UserController().getUser);

routes.post('/transaction', new TransactionController().newTransaction);
routes.get('/transactions', new TransactionController().getTransactions);
routes.put('/transaction/:id', new TransactionController().editTransaction);
routes.delete('/transaction/:id', new TransactionController().deleteTransaction);

export default routes;