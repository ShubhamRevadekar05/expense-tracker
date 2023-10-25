const ExpenseSchema = require("../models/ExpenseModel");
const UserSchema = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../app");


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    if(req.headers["authorization"]) {
        let userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            const expense = ExpenseSchema({
                title,
                amount,
                category,
                description,
                date,
                userId: user.id
            })
        
            try {
                //validations
                if(!title || !category || !description || !date){
                    return res.status(400).json({message: 'All fields are required!'})
                }
                if(amount <= 0 || !amount === 'number'){
                    return res.status(400).json({message: 'Amount must be a positive number!'})
                }
                await expense.save()
                res.status(200).json({message: 'Expense Added'})
            } catch (error) {
                res.status(500).json({message: 'Server Error'})
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized'})
        }
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }

}

exports.getExpense = async (req, res) =>{
    try {
        if(req.headers["authorization"]) {
            let userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
            let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
            if(user) {
                const expenses = await ExpenseSchema.find({userId: user.id}).sort({createdAt: -1})
                res.status(200).json(expenses)
            }
            else {
                res.status(401).json({message: 'Unauthorized'})
            }
        }
        else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    if(req.headers["authorization"]) {
        let userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            const {id} = req.params;
            ExpenseSchema.findByIdAndDelete(id).exec()
                .then((expense) =>{
                    res.status(200).json({message: 'Expense Deleted'})
                })
                .catch((err) =>{
                    res.status(500).json({message: 'Server Error'})
                })
        }
        else {
            res.status(401).json({message: 'Unauthorized'})
        }
    }
    else {
        res.status(401).json({message: 'Unauthorized'})
    }
}