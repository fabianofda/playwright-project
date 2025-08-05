import { MongoClient } from "mongodb"

const client = new MongoClient('mongodb://localhost:27017/linkai')

export async function removeUserByEmail(email: string) {

    await client.connect()

    const result = client
        .db()
        .collection('users')
        .deleteMany({ email: email })

    return (await result).deletedCount
}

export async function removeUserByUserName(username: string) {

    await client.connect()

    const result = client
        .db()
        .collection('users')
        .deleteMany({ username: username })

    return (await result).deletedCount
}


export async function insertUser(user: any) {

    await client.connect()

    const result = client
        .db()
        .collection('users')
        .insertOne(user)

    return (await result).insertedId

}