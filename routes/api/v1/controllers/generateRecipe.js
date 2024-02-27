import {promises as fs} from 'fs'
import express from 'express';
import axios from 'axios'

var router = express.Router();

router.get('/', async (req, res) => {
    try {
      console.log(req.query.ingredientsList)
      const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
        params: {
          apiKey: process.env.SPOONACULAR_API_KEY,
          diet: 'vegetarian',
          includeIngredients: req.query.ingredientsList
        }
      });
  
      res.json(response.data)
    } 
    catch(e) {
      res.status(500).json({ e: e.message })
    }
})

export default router