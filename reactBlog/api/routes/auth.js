
const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');



// **********************
// *******REGISTER*******
// **********************
router.post('/register', async (req, res) => {

    console.log("this the user registration route / page")

    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })

        const user = await newUser.save();
        res.status(200).json(user);
        
    } catch (err) {
        res.status(500).json(err)   
    }

})




// *******************
// *******LOGIN*******
// *******************
router.post('/login', async (req, res) => {

    console.log("this the user login route / page")

    try {

        const user = await User.findOne({ username: req.body.username})
        !user && res.status(400).json("Wrong username")

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated  && res.status(400).json("Wrong password")

        const { password, ...others } = user._doc;
        res.status(200).json(others);
        
    } catch (err) {
        res.status(500).json(err)   
    }

})


module.exports = router;