
export interface User {
    name: string
    username: string
    password: string
}

export const Users = {
    validUser: {
        name: 'fabianofda',
        username: 'fabianofda',
        password: 'fda123'
    },
    invalidPassword: {
        name: 'fabianofda',
        username: 'fabianofda',
        password: 'deuruim123'
    },
    nonExistentUser: {
        name: 'fabianofda',
        username: 'naoexisto',
        password: '123456'
    },
    emptyFields: {
        name: 'fabianofda',
        username: '',
        password: ''
    },
    emptyUsername: {
        name: 'fabianofda',
        username: '',
        password: 'fda123'
    },
    emptyPassword: {
        name: 'fabianofda',
        username: 'fabianofda',
        password: ''
    }
}