
import express from 'express';
import passport from 'passport';
import prisma from '../db/prisma.js';
import bcrypt from 'bcrypt';

const router = express.Router()

export const signup = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        })
         res.status(201).json({
            email: newUser.email,
            password: newUser.password
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

router.post('/signup', (signup))


export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        const isPwValid = await bcrypt.compare(password, user.password)
        if (!isPwValid){
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({
            email: user.email,
            id: user.id,
             message: 'login successful'
        })
    } catch (error) {
        console.log("login error:", error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

router.post('/login', (login))


export const logout = (req: any, res: any) => {
    res.session.destroy((err: any) => {
        if (err) {
            return res.status(500).json({ error: 'Logout failed' });
        }
        return res.status(200).json({ message: 'login successful' })
    })
}

router.post('/logout', (logout))

export default router;