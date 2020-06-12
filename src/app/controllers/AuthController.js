import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/common.js";
import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;

const prisma = new PrismaClient();

async function login(req, res) {
    const credentials = {
        username: req.get("username"),
        password: req.get("password"),
    };
    console.log(credentials);
    await prisma.user.findOne({
        where: { email: credentials.username }
    }).then(async (user) => {
        if (!(await bcrypt.compare(credentials.password, user.password))) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = generateToken({ userId: user.id, email: user.email, name: user.name });
        user.password = undefined;
        return res.status(200).send({ user, token });

    }).catch( err => {
        console.log(err);
        if (err.code === 'P2016') return res.status(404).send("User not found");

        return res.status(400).send(err);
    });
}

export default { login };
