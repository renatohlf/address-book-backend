import prismaClient from '@prisma/client';
const { PrismaClient } = prismaClient;

const prisma = new PrismaClient()

async function getContacts(req, res) {
    const userEmail = req.get("userEmail");
    await prisma.contact.findMany({ where: { user: { email: userEmail }}})
    .then((contacts)=> {
        console.log(contacts)
        return res.status(200).send({ contacts });
    }).catch( err => {
        return res.status(400).send(err);
    });   
}

async function newContact(req, res) {
    const userEmail = req.get("userEmail");
    const { firstName, lastName, email, phone } = req.body;

    if(!userEmail) return res.status(409).send('User not informed');
    
    await prisma.contact.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            user: {                
                connect: { email: userEmail }
            }
        }
    }).then(() => {
        return res.status(200).send('Contact successfully created');
    }).catch(err => {
        console.log(err)

        if(err.code === 'P2016') return res.status(404).send('User not found');

        return res.status(409).send('An error occurred when creating a new contact');
    });

}

async function updateContact(req, res) {
    const { contactId } = req.params;
    const { firstName, lastName, email, userEmail, phone } = req.body;
    
    const data = {
        firstName,
        lastName,
        email,
        phone,
     }
    if(userEmail){
        data.user = {
            connect: { email: userEmail }
        };
    }

    await prisma.contact.update({
        where: { id: parseInt(contactId) },
        data: data
    }).then(() => {
        return res.status(200).send('Contact updated');
    }).catch(err => {
        return res.status(400).send('An error occurred');
    });

}

async function deleteContact(req, res) {
    const { contactId } = req.params;

    await prisma.contact.delete({
        where: { id: parseInt(contactId) }
    }).then(() => {
        return res.status(200).send('Contact successfully deleted');
    }).catch(err => {
        if(err.code === 'P2016') return res.status(404).send('Contact not found');

        return res.status(400).send('An error occurred');
    }); 

}

export default { getContacts, newContact, updateContact, deleteContact };