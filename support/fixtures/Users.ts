import { faker } from '@faker-js/faker/locale/pt_BR'

const name = faker.string.alphanumeric(12)
const mailto = faker.string.alphanumeric(12)

export interface UserSignup {
    name: string
    username: string
    email: string
    senha: string
    confirmaSenha: string
}

export interface UserLogin {
    name: string
    username: string
    senha: string
}

export function getNewUser() {
    const password = 'fda123'

    return {
        name: 'fabianofda',
        username: 'fabianofda',
        email: 'fabianofda@link.ai',
        senha: password,
        confirmaSenha: password
    }
}

export function getDuplicateUser() {
    const password = 'fda123'

    return {
        name: 'fda',
        username: 'fda',
        email: 'fda@link.ai',
        senha: password,
        confirmaSenha: password
    }
}

export const Users = {

    validUser: {
        name: 'fabianof2da',
        username: 'fabianof2da',
        senha: 'fda123'
    },
    nonExistentUser: {
        name: 'fabianofda',
        username: 'naoexisto',
        senha: '123456'
    },
    emptyFields: {
        name: 'fabianofda',
        username: '',
        senha: ''
    },
    emptyPassword: {
        name: name,
        username: name,
        senha: ''
    },
    invalidPassword: {
        name: name,
        username: name,
        senha: 'teste123'
    },
    emptyUsername: {
        name: name,
        username: '',
        senha: 'teste123'
    },
    invalidsenha: {
        name: 'fabianofda',
        username: 'fabianofda',
        email: '',
        senha: 'deuruim123',
        confirmaSenha: ''
    },
    emptysenha: {
        name: 'fabianofda',
        username: 'fabianofda',
        email: '',
        senha: '',
        confirmaSenha: ''
    },
    success: {
        name: name,
        username: name,
        email: `${name}@teste.ai`,
        senha: 'teste123',
        confirmaSenha: 'teste123'
    },
    senhaMismatch: {
        name: name,
        username: name,
        email: `${name}@teste.ai`,
        senha: 'teste123',
        confirmaSenha: 'teste321'
    },
    shortsenha: {
        name: name,
        username: name,
        email: `${mailto}@teste.ai`,
        senha: 'teste',
        confirmaSenha: 'teste'
    },
    emptyName: {
        name: '',
        username: name,
        email: `${mailto}@teste.ai`,
        senha: 'teste123',
        confirmaSenha: 'teste123'
    },
    invalidUsername: {
        name: name,
        username: 't!-s-t#',
        email: `${mailto}@teste.ai`,
        senha: 'teste123',
        confirmaSenha: 'teste123'
    },
    emptyEmail: {
        name: 'teste',
        username: 'teste',
        email: '',
        senha: 'teste111',
        confirmaSenha: 'teste111'
    },
    invalidEmail: {
        name: 'ttesste',
        username: 'ttesste',
        email: 'teste',
        senha: 'teste123',
        confirmaSenha: 'teste123'
    },
    passwordMismatch: {
        name: name,
        username: name,
        email: `${name}@teste.ai`,
        senha: 'teste123',
        confirmaSenha: 'teste321'
    },
    shortPassword: {
        name: name,
        username: name,
        email: `${mailto}@teste.ai`,
        senha: 'teste',
        confirmaSenha: 'teste'
    },
    useSignupEmpyt: {
        name: '',
        username: '',
        email: `${mailto}@teste.ai`,
        senha: 'teste',
        confirmaSenha: 'teste'
    }
}