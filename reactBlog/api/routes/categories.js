const router = require('express').Router();
const Category = require('../models/Category');


// CREATE CATEGORY
router.post('/', async (req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).send(savedCat);
        
    } catch (error) {
        res.status(500).json(error);
        
    }
})


router.get('/', async (req, res) => {
    // console.log(" categories page ")

    try {
        const getCategory = await Category.find()
        res.status(200).json(getCategory)
        // console.log(getCategory)
        
        
    } catch (error) {
        res.status(500).json(error)
    }
})



// DELETE CATEGORY
// UPDATE CATEGORY
// GET CATEGORY



module.exports = router;