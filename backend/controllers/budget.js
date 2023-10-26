const BudgetSchema = require("../models/BudgetModel");
const UserSchema = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../app");


exports.addBudget = async (req, res) => {
    const {amount, category}  = req.body
    if(req.headers["authorization"]) {
        let userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            
            try {
                //validations
                let budget = await BudgetSchema.findOne({category: category}).exec();
                if(budget) {
                    budget = BudgetSchema({
                        amount,
                        category,
                        userId: user.id
                    })
                
                    if(!category){
                        return res.status(400).json({message: 'All fields are required!'})
                    }
                    if(amount <= 0 || !amount === 'number'){
                        return res.status(400).json({message: 'Amount must be a positive number!'})
                    }
                    await budget.save()
                    res.status(200).json({message: 'Budget Added'})
                
                }
                else {
                    if(amount <= 0 || !amount === 'number'){
                        return res.status(400).json({message: 'Amount must be a positive number!'})
                    }
                    await BudgetSchema.findByIdAndUpdate(budget.id, {amount: amount}).exec()
                    res.status(200).json({message: 'Budget Updated'})
                }
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

exports.getBudget = async (req, res) =>{
    try {
        if(req.headers["authorization"]) {
            let userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
            let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
            if(user) {
                const budgets = await BudgetSchema.find({userId: user.id})
                res.status(200).json(budgets)
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

exports.deleteBudget = async (req, res) =>{
    if(req.headers["authorization"]) {
        let userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            const {id} = req.params;
            BudgetSchema.findByIdAndDelete(id).exec()
                .then((budget) =>{
                    res.status(200).json({message: 'Budget Deleted'})
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