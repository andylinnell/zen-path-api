import { dbConnect } from "./connectdb.js";
import { mongo_credientials } from "../secrets.js";



const collectionTasks = mongo_credientials.collection_tasks // zen-tasks is collection


/* *********************************************************** */
// Getall: Tasks
export async function getAllTasks(req, res) {
    const db = dbConnect();
    const collection = await db.collection(collectionTasks).find({}).toArray()

    console.table(collection)
    res.send(collection)
}

/* *********************************************************** */
// Post: Task
export async function addTask(req, res) {
    const newTask = req.body

    const db = dbConnect()
    await db.collection(collectionTasks).insertOne(newTask)
    .catch(err => {
        res.start(500).send(err)
        return
    })
    res.status(201).send( {message: 'New Task Inserted'})
}











