import {promises as fs} from 'fs'
import express from 'express';
import axios from 'axios'

var router = express.Router();

router.get('/', async (req, res) => {
    
})

router.post('/', async (req, res) => {
    const recipeID = req.query.recipeID;
    try {
        const instructionsResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions`, {
            params: {
                apiKey: "6b822790baca45e7ae127974d7410016"
            }
        });

        let instructionsData = await instructionsResponse.data
        const instructions = instructionsData.flatMap(recipe => recipe.steps.map(step => step.step));
        const recipe = await req.models.Recipe.findOneAndUpdate(
            { ID: recipeID },
            { instructions: instructions },
            { new: true }
        );

        let savedRecipe = await req.models.Recipe.findOne({ username: req.session.account.username })

        if (savedRecipe) {
            // Check if savedRecipe already contains an instruction with the given recipeID
            let instructionExists = savedRecipe.recipe.some(instruction => instruction.recipeID === recipeID);
        
            if (!instructionExists) {
                // Create new Instruction document
                let newInstruction = await req.models.Instruction.create({ 
                    recipeID, 
                    steps: instructions 
                })

                await newInstruction.save;
        
                // Add this instruction's ID to the recipe document
                savedRecipe.recipe.push(newInstruction);
                await savedRecipe.save();
            }
        } else {
            // If no savedRecipe, create a new Recipe document
            let newInstruction = await req.models.Instruction.create({ 
                recipeID, 
                steps: instructions 
            })

            await newInstruction.save;

            savedRecipe = await req.models.Recipe.create({
                username: req.session.account.username,
                recipe: [newInstruction]
            })
            await savedRecipe.save();
        }
        res.status(200).json({ message: 'Instructions saved successfully', recipe: recipe });

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

router.delete('/', async (req, res) => {

})

export default router