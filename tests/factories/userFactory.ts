import { faker } from '@faker-js/faker';
import { prisma } from '../../src/configs/database.js';
import bcrypt from 'bcrypt';

function createLogin(email = 'r@gmail.com', passwordLength = 8){
    return {
        email,
        password: faker.internet.password(passwordLength)
    }   
}

interface Login {email: string, password: string};


async function createUser(login: Login){
    const user = await prisma.user.create({
        data: {
            email: login.email,
            password: bcrypt.hashSync(login.password, 12)
        }
    });

    return {...user, plainPassword: login.password};
}

const userFactory = {
    createLogin,
    createUser,
}

export default userFactory;