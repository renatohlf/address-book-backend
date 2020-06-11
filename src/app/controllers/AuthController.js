import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/utils.js';
import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

const prisma = new PrismaClient()


async function login(req, res) {

    const credentials = {
        username: req.get('username'),
        password:  req.get('password')
    };

    try{
        const user = await prisma.user.findOne({ where: { email: credentials.username }});
        
        if(!user) res.status(404).send('Invalid user');

        if(!await bcrypt.compare(credentials.password, user.password)){
            return res.status(400).json({ error: 'Invalid password'}); 
        }
    
        user.password = undefined;

        const token = generateToken({ userId: user.id });

       return res.status(200).send({ token });
    
    } catch (err) {
        return res.status(400).send(err.message);
    }

}

export default { login };