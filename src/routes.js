import express from 'express';

import AuthController from './app/controllers/AuthController.js';
import UserController from './app/controllers/UserController.js';
import ContactController from './app/controllers/ContactController.js';
import authenticated from './app/middlewares/AuthMiddleware.js';

const routes = express.Router();

// User
routes.get('/api/users', authenticated, UserController.getUsers);
routes.patch('/api/user/:userId', authenticated, UserController.updateUser);
routes.delete('/api/user', authenticated, UserController.deleteUser);

// Auth
routes.post('/api/login', AuthController.login);
routes.post('/api/register', UserController.registerUser);

// Contacts
routes.get('/api/contacts', authenticated, ContactController.getContacts);
routes.post('/api/contact', authenticated, ContactController.newContact);
routes.patch('/api/contact/:contactId', authenticated, ContactController.updateContact);
routes.delete('/api/contact/:contactId', authenticated, ContactController.deleteContact);



export default routes;




