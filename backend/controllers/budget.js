const BudgetSchema = require("../models/BudgetModel");
const UserSchema = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../app");


exports.addBudget = async (req, res) => {
    const {amount, category}  = req.body
    if(req.headers["authorization"]) {
        try {
            var userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        }
        catch(err) {
            console.error(err);
            return res.status(401).json({message: 'Unauthorized'});
        }
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            
            try {
                //validations
                let budget = await BudgetSchema.findOne({category: category, userId: user.id}).exec();
                let add = true;
                if(budget) {
                    if(amount <= 0 || !amount === 'number'){
                        return res.status(400).json({message: 'Amount must be a positive number!'})
                    }
                    add = false;
                    await BudgetSchema.findByIdAndUpdate(budget.id, {amount: amount}).exec()
                }
                else {
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
                    add = true;
                    await budget.save()
                }
                let overallBudgetAmount = 0;
                const budgets = await BudgetSchema.find({userId: user.id});
                budgets.forEach(element => {
                    if(element.category !== "Overall") overallBudgetAmount += element.amount;
                });
                let overallBudget = await BudgetSchema.findOne({category: "Overall", userId: user.id}).exec();
                if(overallBudget) {
                    let amountToSet = 0;
                    if(category === "Overall") {
                        amountToSet = amount > overallBudgetAmount ? amount : overallBudgetAmount;
                    }
                    else {
                        amountToSet = overallBudgetAmount > overallBudget.amount ? overallBudgetAmount : overallBudget.amount;
                    }
                    await BudgetSchema.findByIdAndUpdate(overallBudget.id, {amount: amountToSet}).exec()
                }
                if(add) {
                    res.status(200).json({message: 'Budget Added'})
                }
                else {
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
            try {
                var userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
            }
            catch(err) {
                console.error(err);
                return res.status(401).json({message: 'Unauthorized'});
            }
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
        try {
            var userDetails = jwt.verify(req.headers["authorization"].split("Bearer ")[1], SECRET_KEY);
        }
        catch(err) {
            console.error(err);
            return res.status(401).json({message: 'Unauthorized'});
        }
        let user = await UserSchema.findOne({username: userDetails.username, email: userDetails.email}).exec();
        if(user) {
            const {id} = req.params;
            BudgetSchema.findOneAndDelete({_id: id, userId: user.id}).exec()
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