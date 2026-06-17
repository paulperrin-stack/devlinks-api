import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from './prisma/client.js'

const app = express()
const port = 3000

app.use(express.json())

// CREATE: add a new user
app.post('/register', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Email and/or username already exists or invalid data'})
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})