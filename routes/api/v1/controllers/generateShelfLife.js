import { promises as fs } from 'fs'
import express from 'express';
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const data = require("../data/expirationPeriods.json")

var router = express.Router()

router.get('/', async (req, res) => {
  try {
    let food = req.query.food
    let shelfdays = data.find(item => item.Name.toLowerCase() === food.toLowerCase())?.Shelf_Days;
    if (!shelfdays) {
      shelfdays = 0
    }
    res.json(shelfdays)
  }
  catch (e) {
    res.status(500).json({ e: e.message })

  }
})

export default router