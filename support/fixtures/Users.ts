
export interface User {
    name: string
    username: string
    email: string
    password: string
    confirmapassword: string
}

export function getNewUser() {
    const password = 'fda123'

    return {
        name: 'fabianofda',
        username: 'fabianofda',
        email: 'fabianofda@link.ai',
        password: password,
        confirmapassword: password
    }
}

export function getDuplicateUser() {
    const password = 'fda123'

    return {
        name: 'fda',
        username: 'fda',
        email: 'fda@link.ai',
        password: password,
        confirmapassword: password
    }
}

export function getLoginUser() {
    const password = 'fda123'

    return {
        name: 'fabianof2da',
        username: 'fabianof2da',
        email: 'fabianof2da@link.ai',
        password: password,
        confirmapassword: password
    }
}
export function getTempUser() {
    const password = 'fda123'

    return {
        name: 'andrade',
        username: 'andrade',
        email: 'andrade@link.ai',
        password: password,
        confirmapassword: password
    }

}