import 'dotenv/config'
import { Request, Response } from 'express';
import { userRepository } from '../repositories/userRepository';
import jwt from 'jsonwebtoken';
import { encryptPasswordValue, comparePasswords } from '../utils/handlePassword';
import validateUser from '../filters/schemaVerifyUser';

export class UserController {
    async signUp(req: Request, res: Response) {
        const { username, password } = req.body;
        try {
            const userInfo = await userRepository.findOneBy({ username });
            if (userInfo) return res.status(400).json({ mensagem: 'Este username já existe' })

            const passwordHash = await encryptPasswordValue(password);
            const newUser = userRepository.create({
                username,
                password: passwordHash
            })

            await userRepository.save(newUser);
            return res.status(201).json(newUser);

        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal server error' })
        }
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;

        try {
            const userInfo = await userRepository.findOneBy({ username })
            if (!userInfo) return res.status(400).json('O usuário não foi encontrado');

            const correctPassowrd = await comparePasswords(password, userInfo.password)
            if (!correctPassowrd) return res.status(400).json('Username e senha não conferem')

            const token = jwt.sign({ id: userInfo.id },
                process.env.JWT_PASS ?? '',
                { expiresIn: '24h' });

            const { password: _, ...userLogin } = userInfo

            return res.json({ user: userLogin, token });

        } catch (error) {
            console.log("erro > ", error)
            return res.status(500).json({ message: 'Internal server error' })
        }

    }

    async getUser(req: Request, res: Response) {
        return res.json(req.user);
    }
}