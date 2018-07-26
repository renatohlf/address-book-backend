import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AuthManager from './controllers/auth-manager';


export default function() {
    //Load services
    var services = {
        jwt,
        AuthManager,
        bcrypt
    };

    return services;
}