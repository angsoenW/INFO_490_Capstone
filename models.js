import mongoose from 'mongoose'
import 'dotenv/config'

let models = {}
await mongoose.connect("mongodb+srv://aalexzhang:azhangwebsharer@cluster0.20helcs.mongodb.net/")

let instructionSchema = new mongoose.Schema({
    recipeID: String,
    steps: [String]
})

let recipeSchema = new mongoose.Schema({
    username: String,
    recipe: [instructionSchema]
})

let inventorySchema = new mongoose.Schema({
    username: String,
    contents: [String],
})

models.Instruction = mongoose.model('Instruction', instructionSchema)
models.Recipe = mongoose.model('Recipe', recipeSchema)
models.Inventory = mongoose.model('Inventory', inventorySchema)

export default models