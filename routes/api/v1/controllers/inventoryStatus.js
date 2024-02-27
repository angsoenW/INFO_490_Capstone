import {promises as fs} from 'fs'
import express from 'express' 

var router = express.Router() 

router.get('/', async (req, res) => {
    try {
        if(!req.session.isAuthenticated) {
            return res.status(401).json({ 
                status: "error", 
                error: "not logged in" 
            }) 
        }
        let inventory = await req.models.Inventory.findOne({ username: req.session.account.username })
        res.status(200).json(inventory)
    }
    catch(e) {
        res.status(500).json({ e: e.message })
    }
})

router.post('/', async (req, res) => {
    try {
        if(!req.session.isAuthenticated) {
            return res.status(401).json({ 
                status: "error", 
                error: "not logged in" 
            })
        }

        let inventory = await req.models.Inventory.findOne({ username: req.session.account.username })

        if(inventory) {
            if(!inventory.contents.includes(req.query.ingredient)) {
                inventory.contents.push(req.query.ingredient) 
            }
        } 
        else {
            inventory = await req.models.Inventory.create({
                username: req.session.account.username,
                contents: [req.query.ingredient]
            })
        }
        await inventory.save() 
        res.status(200).json(inventory)
    }
    catch(e) {
        res.status(500).json({ e: e.message })
    }
})

router.delete('/', async (req, res) => {
    try {
        if(!req.session.isAuthenticated) {
            return res.status(401).json({ 
                status: "error", 
                error: "not logged in" 
            })
        }

        let inventory = await req.models.Inventory.findOne({ username: req.session.account.username })

        if(inventory) {
            const index = inventory.contents.indexOf(req.query.ingredient) 
            if(index !== -1) {
                inventory.contents.splice(index, 1) 
                await inventory.save() 
            }
            res.status(200).json(inventory) 
        } else {
            res.status(404).json({ status: "error", error: "Inventory not found" }) 
        }
    }
    catch(e) {
        res.status(500).json({ e: e.message })
    }
})

export default router