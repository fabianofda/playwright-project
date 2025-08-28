
export interface User {
    name: string
    username: string
    email: string
    password: string
    confirmapassword: string,
    links?: Link[]

}

export interface Link {
    title: string
    url: string
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

export function getUserWithLink() {
    const password = 'fda123'

    return {
        name: 'andrade',
        username: 'andrade',
        email: 'andrade@link.ai',
        password: password,
        confirmapassword: password,
        links: [{
            title: 'meu projeto',
            url: 'https://andrade.dev/lnks'
        }]
    }

}

export function getUserWithLinks() {
    const password = 'fda123'

    return {
        name: 'dias',
        username: 'dias',
        email: 'dias@link.ai',
        password: password,
        confirmapassword: password,
        links: [
            { title: 'meu projeto', url: 'https://dias.dev/lnks' },
            { title: 'meu blog', url: 'https://dias.dev/blog' },
            { title: 'meu instagran', url: 'https://dias.dev/instagran' },
            { title: 'meu github', url: 'https://dias.dev/github' },
            { title: 'meu twitter', url: 'https://dias.dev/twitter' },
        ]
    }

}

export function getUserWithSocialMedia() {
    const password = 'fda123'

    return {
        name: 'lucy',
        username: 'lucy',
        email: 'lucy@link.ai',
        password: password,
        confirmapassword: password,
        socialMedia:
        {
            gitHub: 'lucy',
            linkedIn: 'lucy',
            instagram: 'lucy'
        }
    }

}