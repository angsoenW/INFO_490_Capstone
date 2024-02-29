import {promises as fs} from 'fs'
import express from 'express';
import axios from 'axios'

var router = express.Router();

router.get('/', async (req, res) => {
    try {
        let savedRecipe = await req.models.Recipe.findOne({ username: req.session.account.username })
        
        
        // Attempt to find the recipe by its ID
    
        if (savedRecipe) {

            res.status(200).json(savedRecipe.recipe);
        } else {
            res.status(404).json({ message: 'Recipe not found' });
        }
    
      }
      catch (e) {
        res.status(500).json({ e: e.message })
      }
})

router.post('/', async (req, res) => {
    const recipeID = req.query.recipeID;
    const recipeTitle = req.query.recipeTitle;
    const recipeImage = req.query.recipeImage;

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
                    recipeTitle,
                    recipeImage,
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
                recipeTitle,
                recipeImage,
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
    const recipeID = req.query.recipeID;
    console.log(recipeID, "AAAAAAAAAAAAAAAAAAA")
    try {
        if(!req.session.isAuthenticated) {
            return res.status(401).json({ 
                status: "error", 
                error: "not logged in" 
            })
        }

        let recipe = await req.models.Recipe.findOne({ username: req.session.account.username })

        //Delete recipe from the user's saved recipe array
        if(recipe) {
            recipe.recipe = recipe.recipe.filter(instruction => instruction.recipeID !== recipeID)
            await recipe.save()
        }

        res.status(200).json({ message: 'Instructions deleted successfully' })
        
    }
    catch(e) {
        res.status(500).json({ e: e.message })
    }
})

export default router