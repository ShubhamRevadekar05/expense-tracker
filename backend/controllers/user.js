const UserSchema = require("../models/UserModel");
const { SECRET_KEY } = require("../app");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    var user = UserSchema({
        username,
        email,
        password: crypto.createHash('sha256').update(password).digest("hex")
    });

    if(!username || !email || !password) {
        res.status(400).json({message: "All fields are required!"});
    }
    else {
        let userByName = await UserSchema.findOne({username: username}).exec();
        let userByEmail = await UserSchema.findOne({email: email}).exec();
        if(userByEmail) {
            res.status(400).json({message: "Email already exists!"})
        }
        else if(userByName) {
            res.status(400).json({message: "Username already exists!"})
        }
        else {
            await user.save();
            res.status(200).json({message: "User saved!"});
        }
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    let user = await UserSchema.findOne({email: email}).exec();
    if(user) {
        if(user.password === crypto.createHash('sha256').update(password).digest("hex")) {
            const token = jwt.sign({ username: user.username, email: user.email }, SECRET_KEY, /* { expiresIn: '1h' } */);
            res.status(200).json({username: user.username, email: user.email, token: token});
        }
        else {
            res.status(401).json({message: "Incorrect password!"});
        }
    }
    else {
        res.status(404).json({message: "No user found!"});
    }
}