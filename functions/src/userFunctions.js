import { dbConnect } from "./connectdb.js";
import { mongo_credientials } from "../secrets.js";
import { ObjectId } from "mongodb";



const collectionUsers = mongo_credientials.collection_users // zen-users is collection


/* *********************************************************** */
// Getall: Users
export async function getAllUsers(req, res) {
    const db = dbConnect();
    const collection = await db.collection(collectionUsers).find({}).toArray()

    console.table(collection)
    res.send(collection)
}


/* *********************************************************** */
// Post: User
export async function addUser(req, res) {
    const newUser = req.body

    const db = dbConnect()
    await db.collection(collectionUsers).insertOne(newUser)
        .catch(err => {
            res.start(500).send(err)
            return
        })
    res.status(201).send({ message: 'New User Inserted' })
}

/* *********************************************************** */
// Delete User
export async function deleteUser(req, res) {
    const db = dbConnect()
    const { userId } = req.params
    const collection = await db.collection(collectionUsers)
        .findOneAndDelete({ _id: new ObjectId(userId) })
    res.status(203).send('User Deleted')
}


/* *********************************************************** */

export async function updateUser(req, res) {
    const { userId } = req.params
    const db = dbConnect()

    await db.collection(collectionUsers)
        .findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: req.body })
        .catch(err => {
            res.status(500).send(err)
            return
        })
    res.status(202).send({ message: "user updated" })
}

