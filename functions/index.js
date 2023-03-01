import functions from "firebase-functions"
import express from "express"
import cors from "cors"
import { addUser, deleteUser, getAllUsers, updateUser } from "./src/userFunctions.js"
import { addTask, getAllTasks } from "./src/taskFunctions.js"

const app = express()
app.use( cors())
app.use( express.json())

app.get("/", (req, res) => res.send(`ROOT`))


/**************** USERS *********************/
app.get("/users", getAllUsers)
app.post("/users", addUser)
app.delete("/users/:userId", deleteUser)
app.patch("/users/:userId", updateUser)



/**************** TASKS *********************/
app.get("/tasks", getAllTasks)
app.post("/tasks", addTask)



export const api = functions.https.onRequest( app );


