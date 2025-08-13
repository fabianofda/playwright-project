import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const client = new MongoClient('mongodb://localhost:27017/linkai')

export async function removeLinks(domain: string) {

    await client.connect()

    const result = await client
        .db()
        .collection('links')
        .deleteMany({ url: { $regex: domain, $options: 'i' }})

    return result.deletedCount
}

export async function removeUserByEmail(email: string) {

    await client.connect()

    const result = await client
        .db()
        .collection('users')
        .deleteMany({ email: email })

    return result.deletedCount
}

export async function removeUserByUserName(username: string) {

    await client.connect()

    const result = await client
        .db()
        .collection('users')
        .deleteMany({ username: username })

    return result.deletedCount
}


export async function insertUser(user: any) {

    await client.connect()

    const hashPass = await bcrypt.hash(user.password, 10)

    const userWithHashPass = {
        ...user,
        password: hashPass
    }

    const result = await client 
        .db()
        .collection('users')
        .insertOne(userWithHashPass)

    return result.insertedId

}

