import bcrypt from "bcryptjs";
import prismaClient from "@prisma/client";
const { PrismaClient } = prismaClient;
const prisma = new PrismaClient();

async function getUsers(req, res) {
  await prisma.user
    .findMany({ 
        select: { name: true, email: true } })
    .then((users) => {
      return res.status(200).send({ users: users });
    })
    .catch((err) => {
      return res.status(400).send(err.message);
    });
}

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  let hashedPassword = await bcrypt.hash(password, 8);

  await prisma.user
    .create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    })
    .then((user) => {
      //TODO: Implement mailer
      return res.status(200).send("User successfully created");
    })
    .catch((err) => {
      if (err.code === "P2002")
        return res.status(409).send("User already registered");

      return res.status(400).send(err); //TODO: Implement a better error structure
    });
}

async function updateUser(req, res) {
  const { userId } = req.params;
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(409).send("Password not matching");
  }

  let hashedPassword = await bcrypt.hash(password, 8);

  await prisma.user
    .update({
      where: { id: parseInt(userId) },
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
      },
    })
    .then((user) => {
      //TODO: Implement mailer
      return res.status(200).send("User successfully updated");
    })
    .catch((err) => {
      if (err.code === "P2002")
        return res.status(409).send("Email already registered");

      return res.status(409).send(err); //TODO: Implement a better error structure
    });
}

async function deleteUser(req, res) {
  const { email } = req.body;

  await prisma.user
    .delete({
      where: { email: email },
    })
    .then(() => {
      return res.status(200).send("User deleted");
    })
    .catch((err) => {
      if (err.code === "P2016") return res.status(404).send("User not found");

      return res.status(400).send("An error occurred");
    });
}

export default {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
};
