import { promises as fs } from 'fs'
import express from 'express';
import axios from 'axios'

var router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log(req.query.ingredientsList)
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        apiKey: "6b822790baca45e7ae127974d7410016",
        // diet: 'vegetarian',
        includeIngredients: req.query.ingredientsList,
        instructionsRequired: true,
        fillIngredients: true,
        addRecipeInformation: true
      }
    })

    let data = await response.data

    // for (let recipe of data.results) {
    //   const instructionsResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/analyzedInstructions`, {
    //     params: {
    //       apiKey: "31e71afd95fa4c8c841e4771f6e97d44"
    //     }
    //   })

    //   let instructionsData = await instructionsResponse.data
    //   for (let instruction of instructionsData) {
    //     for (let step of instruction.steps) {
    //       console.log(step)
    //     }
    //   }
    // }

    res.json(data)
  }
  catch (e) {
    res.status(500).json({ e: e.message })
  }
})

export default router