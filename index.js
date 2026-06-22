import express from 'express'
import bcrypt from 'bcryptjs'
import prisma from './prisma/client.js'
import 'dotenv/config'

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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
})

app.post('/links', async (req, res) => {
    const { name, url, logoUrl, userId } = req.body;

    if (!name || !url ) {
        return res.status(400).json({ error: 'Name and url are required fields.'});
    }

    try {
        const newLink = await prisma.link.create({
            data: {
                name,
                url,
                logoUrl,
                userId,
            }
        });
        res.status(201).json(newLink);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ error: 'Name and/or url already exists or invalid data' });
    }
});

app.put('/links/:id', async (req, res) => {
    const { id } = req.params;
    const { url, name } = req.body;

    try {
        const updatedLink = await prisma.link.update({
            where: { id: parseInt(id) },
            data: { url, name },
        });

        res.json(updatedLink);
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Link not found' });
        }
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})