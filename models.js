import mongoose from 'mongoose'
import 'dotenv/config'

// TODO: Make a seperate database and add a .env file

let models = {}
await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.mongodb.net/`)

let recipeSchema = new mongoose.Schema({
    ID: Number,
    username: String,
    name: String,
    ingredients: String,
    cuisine: String,
    diet: String,
    intolerences: String
})

let inventorySchema = new mongoose.Schema({
    username: String,
    contents: [String],
})


models.Recipe = mongoose.model('Recipe', recipeSchema)
models.Inventory = mongoose.model('Inventory', inventorySchema)

export default models