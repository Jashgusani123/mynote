const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fatchUser = require('../middlaware/fatchUser')

const JWT_SECRET = "HeyJashYourNo1"

// Router:1 Create A User POST /api/author/createuser
router.post("/createuser", [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ errors: errors.array() });
    }
    // if the user with this email is exsist is check
    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            success = false;
            return res.status(400).json({ error: "Sorry a User with this email already exists" })
        }
        const salt = bcrypt.genSaltSync(10);
        const screatpassword = await bcrypt.hash(req.body.password, salt)
        // user create 
        user = await User.create({
            name: req.body.name,
            password: screatpassword,
            email: req.body.email
        })
        const data = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(data, JWT_SECRET)
        res.json({success,token })
    }
    // if any systex error
   

    catch (error) {
        console.error(error.massage);
        res.status(500).send("Intarnal Serval Error");
    }
})

//Router:2 Login System POST /api/author/login 
router.post("/login", [
    body('email').isEmail(),
], async (req, res) => {
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Plz try to login with correct credentails" })
        }
        const passwordCommpare = await bcrypt.compare(password, user.password)
        if (!passwordCommpare) {
            success = false;
            return res.status(400).json({ error: "Plz try to login with correct credentails" })
        } else {
            const data = {
                user: {
                    id: user.id,
                }
            }
            const token = jwt.sign(data, JWT_SECRET)
            res.json({success, token })
        }

    }catch (error) {
        console.error(error.massage);
        res.status(500).send("Intarnal Serval Error");
    }
})
// Router:3 Get User System POST /api/author/getuser
router.post("/getuser", fatchUser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch (error) {
        console.error(error.massage);
        res.status(500).send("Intarnal Serval Error");
    }
})


module.exports = router